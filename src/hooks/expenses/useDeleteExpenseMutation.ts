import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useExpenseFilters } from "~/hooks/filters";
import { queryClient } from "~/lib/queryClient";
import { expenseService } from "~/services/expenses";
import type { PaginatedExpenseResponse } from "~/types/expense";
import { EXPENSES_QUERY_KEY } from "./useCreateExpenseMutation";
import { DASHBOARD_QUERY_KEY } from "../dashboard/useDashboardData";

interface DeleteExpenseResponse {
  deletedCount: number;
  templateDeactivated: boolean;
}

export function useDeleteExpenseMutation() {
  const { filters } = useExpenseFilters();
  const queryKey = [EXPENSES_QUERY_KEY[0], filters];

  const { mutateAsync: deleteExpense, isPending } = useMutation<
    DeleteExpenseResponse,
    AxiosError,
    string
  >({
    mutationFn: (id: string) => expenseService.delete(id),
    onMutate: (variables) => {
      const previousData = queryClient.getQueryData<PaginatedExpenseResponse>(queryKey);

      queryClient.setQueryData(queryKey, (old: PaginatedExpenseResponse) => ({
        ...old,
        data: old.data.filter((expense) => expense.id !== variables),
        meta: {
          ...old.meta,
          total: old.meta.total - 1,
        },
      }));

      return { previousData };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });

      if (data.deletedCount > 1) {
        toast.success(
          `Despesa removida com sucesso (${data.deletedCount} ocorrências futuras excluídas)`,
        );
      } else {
        toast.success("Despesa removida com sucesso");
      }
    },
    onError: (error, _variables, context) => {
      queryClient.setQueryData(
        queryKey,
        (context as { previousData?: PaginatedExpenseResponse })?.previousData,
      );
      if (error instanceof AxiosError) {
        toast.error(
          (error.response?.data as { message: string }).message ||
            "Erro ao remover despesa",
        );
      } else {
        toast.error("Erro ao remover despesa");
      }
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

  return { deleteExpense, isPending };
}
