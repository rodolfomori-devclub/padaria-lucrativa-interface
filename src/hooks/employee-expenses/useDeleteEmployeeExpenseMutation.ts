import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEmployeeExpenseFilters } from "~/hooks/filters/employee-expense-filters";
import { queryClient } from "~/lib/queryClient";
import { employeeExpenseService } from "~/services/employee-expenses";
import type { PaginatedEmployeeExpenseResponse } from "~/types/employee-expense";
import { EMPLOYEE_EXPENSES_QUERY_KEY } from "./useCreateEmployeeExpenseMutation";
import { DASHBOARD_QUERY_KEY } from "../dashboard/useDashboardData";

export function useDeleteEmployeeExpenseMutation() {
  const { filters } = useEmployeeExpenseFilters();
  const queryKey = [EMPLOYEE_EXPENSES_QUERY_KEY[0], filters];

  const { mutateAsync: deleteEmployeeExpense, isPending } = useMutation({
    mutationFn: (id: string) => employeeExpenseService.delete(id),
    onMutate: async (id) => {
      const previousEmployeeExpenses =
        queryClient.getQueryData<PaginatedEmployeeExpenseResponse>(queryKey);

      queryClient.setQueryData<PaginatedEmployeeExpenseResponse>(
        queryKey,
        (
          old: PaginatedEmployeeExpenseResponse | undefined,
        ): PaginatedEmployeeExpenseResponse => ({
          data: (old?.data || []).filter((expense) => expense.id !== id) || [],
          meta: old?.meta || {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
        }),
      );

      return { previousEmployeeExpenses };
    },
    onSuccess: (data) => {
      if (data?.deletedCount > 0) {
        toast.success(
          `Funcionário removido - ${data.deletedCount} ocorrências futuras foram excluídas`,
        );
      } else {
        toast.success("Despesa com pessoal excluída com sucesso");
      }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousEmployeeExpenses) {
        queryClient.setQueryData(queryKey, context.previousEmployeeExpenses);
      }
      toast.error("Erro ao excluir despesa com pessoal");
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

  return { deleteEmployeeExpense, isPending };
}
