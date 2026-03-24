import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEmployeeExpenseFilters } from "~/hooks/filters/employee-expense-filters";
import { queryClient } from "~/lib/queryClient";
import { employeeExpenseService } from "~/services/employee-expenses";
import type {
  CreateEmployeeExpenseData,
  EmployeeExpense,
  PaginatedEmployeeExpenseResponse,
} from "~/types/employee-expense";
import { DASHBOARD_QUERY_KEY } from "../dashboard/useDashboardData";

export const EMPLOYEE_EXPENSES_QUERY_KEY = ["employee-expenses"];

export function useCreateEmployeeExpenseMutation() {
  const { filters } = useEmployeeExpenseFilters();
  const queryKey = [EMPLOYEE_EXPENSES_QUERY_KEY[0], filters];

  const { mutateAsync: createEmployeeExpense, isPending } = useMutation({
    mutationFn: (data: CreateEmployeeExpenseData) => {
      // Calculate day based on current filters (2nd of the filtered month)
      const currentDate = new Date();
      const month = filters.month || currentDate.getMonth() + 1;
      const year = filters.year || currentDate.getFullYear();
      const day = new Date(year, month - 1, 2).toISOString(); // 2nd day of the month

      return employeeExpenseService.create({
        ...data,
        day,
      });
    },
    onMutate: (variables) => {
      const tempEmployeeExpenseId = Math.random().toString();

      const previousEmployeeExpenses =
        queryClient.getQueryData<EmployeeExpense[]>(queryKey);

      // Calculate day for optimistic update
      const currentDate = new Date();
      const month = filters.month || currentDate.getMonth() + 1;
      const year = filters.year || currentDate.getFullYear();
      const day = new Date(year, month - 1, 2);

      queryClient.setQueryData(
        queryKey,
        (old: PaginatedEmployeeExpenseResponse | undefined) => ({
          data: [
            ...(old?.data || []),
            {
              ...variables,
              id: tempEmployeeExpenseId,
              day,
              jobName: "",
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          meta: old?.meta || { total: 0, page: 1, limit: 10 },
        }),
      );
      return { previousEmployeeExpenses, tempEmployeeExpenseId };
    },
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData(
        queryKey,
        (old: PaginatedEmployeeExpenseResponse | undefined) => ({
          data:
            old?.data.map((expense) =>
              expense.id === context?.tempEmployeeExpenseId ? data : expense,
            ) || [],
          meta: old?.meta || { total: 0, page: 1, limit: 10 },
        }),
      );
      toast.success("Despesa com pessoal criada com sucesso");
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousEmployeeExpenses);
      toast.error("Erro ao criar despesa com pessoal");
    },
    onSettled: () => {
      // Invalidate all employee-expenses queries (different filters, pages, etc.)
      queryClient.invalidateQueries({
        queryKey: EMPLOYEE_EXPENSES_QUERY_KEY,
      });

      // Invalidate dashboard since it uses employee expenses data
      queryClient.invalidateQueries({
        queryKey: DASHBOARD_QUERY_KEY,
      });
    },
  });

  return { createEmployeeExpense, isPending };
}
