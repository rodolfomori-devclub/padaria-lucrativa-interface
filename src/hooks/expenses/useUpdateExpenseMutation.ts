import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useExpenseFilters } from "~/hooks/filters";
import { queryClient } from "~/lib/queryClient";
import { expenseService } from "~/services/expenses";
import type { Expense, PaginatedExpenseResponse, UpdateExpenseData } from "~/types/expense";
import { EXPENSES_QUERY_KEY } from "./useCreateExpenseMutation";
import { DASHBOARD_QUERY_KEY } from "../dashboard/useDashboardData";

interface UpdateExpenseVariables {
  id: string;
  data: UpdateExpenseData;
}

export function useUpdateExpenseMutation() {
  const { filters } = useExpenseFilters();
  const queryKey = [EXPENSES_QUERY_KEY[0], filters];

  const { mutateAsync: updateExpense, isPending } = useMutation({
    mutationFn: async ({ id, data }: UpdateExpenseVariables) => {
      return await expenseService.update(id, data);
    },
    onMutate: async (variables) => {
      const previousData = queryClient.getQueryData<PaginatedExpenseResponse>(queryKey);
      const previousExpense = queryClient.getQueryData<Expense>([
        queryKey,
        variables.id,
      ]);

      // Optimistically update expenses list
      if (previousData) {
        queryClient.setQueryData<PaginatedExpenseResponse>(
          queryKey,
          (old) => {
            if (!old) return old;
            return {
              ...old,
              data: old.data.map((expense) =>
                expense.id === variables.id
                  ? { ...expense, ...variables.data, updatedAt: new Date() } as Expense
                  : expense,
              ),
            };
          },
        );
      }

      // Optimistically update single expense if it exists in cache
      if (previousExpense) {
        queryClient.setQueryData<Expense>([queryKey, variables.id], {
          ...previousExpense,
          ...variables.data,
          updatedAt: new Date(),
        } as Expense);
      }

      return { previousData, previousExpense };
    },
    onSuccess: (data, variables) => {
      // Update both the list and individual expense cache with real data
      queryClient.setQueryData<PaginatedExpenseResponse>(
        queryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((expense) =>
              expense.id === variables.id ? data : expense,
            ),
          };
        },
      );

      queryClient.setQueryData<Expense>([queryKey, variables.id], data);

      toast.success("Despesa atualizada com sucesso");
    },
    onError: (_error, variables, context) => {
      // Rollback optimistic updates
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      if (context?.previousExpense) {
        queryClient.setQueryData(
          [queryKey, variables.id],
          context.previousExpense,
        );
      }

      toast.error("Erro ao atualizar despesa");
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

  return { updateExpense, isPending };
}
