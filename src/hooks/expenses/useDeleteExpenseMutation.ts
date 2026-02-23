import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useExpenseFilters } from "~/hooks/filters";
import { queryClient } from "~/lib/queryClient";
import { expenseService } from "~/services/expenses";
import type { Expense } from "~/types/expense";
import { EXPENSES_QUERY_KEY } from "./useCreateExpenseMutation";

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
      const previousExpenses = queryClient.getQueryData<Expense[]>(queryKey);

      queryClient.setQueryData(queryKey, (old: Expense[]) =>
        old.filter((expense) => expense.id !== variables),
      );

      return { previousExpenses };
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
        (context as { previousExpenses?: Expense[] })?.previousExpenses,
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
  });

  return { deleteExpense, isPending };
}
