import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useExpenseFilters } from "~/hooks/filters";
import { queryClient } from "~/lib/queryClient";
import { expenseService } from "~/services/expenses";
import type { CreateExpenseData, Expense, PaginatedExpenseResponse } from "~/types/expense";
import { DASHBOARD_QUERY_KEY } from "../dashboard/useDashboardData";

export const EXPENSES_QUERY_KEY = ["expenses"];

export function useCreateExpenseMutation() {
  const { filters } = useExpenseFilters();
  const queryKey = [EXPENSES_QUERY_KEY[0], filters];

  const { mutateAsync: createExpense, isPending } = useMutation({
    mutationFn: (data: CreateExpenseData) => {
      // Calculate day based on current filters (2nd of the filtered month)
      const currentDate = new Date();
      const month = filters.month || currentDate.getMonth() + 1;
      const year = filters.year || currentDate.getFullYear();
      const day = new Date(year, month - 1, 2).toISOString(); // 2nd day of the month

      return expenseService.create({
        ...data,
        day,
      });
    },
    onMutate: (variables) => {
      const tempExpenseId = Math.random().toString();

      const previousData = queryClient.getQueryData<PaginatedExpenseResponse>(queryKey);

      const isGovFreeExisting = previousData?.data.find(
        (expense) => expense.isGovFee,
      );
      // Calculate day for optimistic update
      const currentDate = new Date();
      const month = filters.month || currentDate.getMonth() + 1;
      const year = filters.year || currentDate.getFullYear();
      const day = new Date(year, month - 1, 2);

      if (isGovFreeExisting && variables.isGovFee) {
        queryClient.setQueryData(queryKey, (old: PaginatedExpenseResponse) => ({
          ...old,
          data: old.data.map((expense) =>
            expense.id === isGovFreeExisting.id
              ? { ...expense, value: variables.value }
              : expense,
          ),
        }));
      } else {
        queryClient.setQueryData(queryKey, (old: PaginatedExpenseResponse) => ({
          ...old,
          data: [
            ...old.data,
            {
              ...variables,
              id: tempExpenseId,
              day,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as Expense,
          ],
          meta: {
            ...old.meta,
            total: old.meta.total + 1,
          },
        }));
      }

      return { previousData, tempExpenseId };
    },
    onSuccess: (data, _variables, context) => {
      const existingData = queryClient.getQueryData<PaginatedExpenseResponse>(queryKey);
      const existiingIsGovFee = existingData?.data.find((expense) => expense.isGovFee);
      
      if (existiingIsGovFee && _variables.isGovFee) {
        queryClient.setQueryData(queryKey, (old: PaginatedExpenseResponse) => ({
          ...old,
          data: old.data.map((expense) =>
            expense.id === existiingIsGovFee.id
              ? { ...expense, value: _variables.value }
              : expense,
          ),
        }));
      } else {
        // Check if returned expense's date matches current filter
        const expenseMonth = new Date(data.day).getMonth() + 1;
        const expenseYear = new Date(data.day).getFullYear();
        const filterMonth = filters.month || new Date().getMonth() + 1;
        const filterYear = filters.year || new Date().getFullYear();

        // Only update cache if dates match, otherwise invalidate
        if (expenseMonth === filterMonth && expenseYear === filterYear) {
          queryClient.setQueryData(queryKey, (old: PaginatedExpenseResponse) => ({
            ...old,
            data: old.data.map((expense) =>
              expense.id === context?.tempExpenseId ? data : expense,
            ),
          }));
        } else {
          // Date doesn't match filter, remove temp and refetch
          queryClient.setQueryData(queryKey, (old: PaginatedExpenseResponse) => ({
            ...old,
            data: old.data.filter((expense) => expense.id !== context?.tempExpenseId),
            meta: {
              ...old.meta,
              total: old.meta.total - 1,
            },
          }));
          queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
        }
      }
      toast.success("Despesa criada com sucesso");
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
      toast.error("Erro ao criar despesa");
    },
    onSettled: () => {
      // Invalidate all expenses queries (different filters, pages, etc.)
      queryClient.invalidateQueries({
        queryKey: EXPENSES_QUERY_KEY,
      });

      // Invalidate dashboard since it uses expenses data
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEY,
      });
    },
  });

  return { createExpense, isPending };
}
