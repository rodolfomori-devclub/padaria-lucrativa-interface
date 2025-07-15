import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useExpenseFilters } from "~/hooks/filters";
import { queryClient } from "~/lib/queryClient";
import { expenseService } from "~/services/expenses";
import type { Expense } from "~/types/expense";
import { EXPENSES_QUERY_KEY } from "./useCreateExpenseMutation";

export function useDeleteExpenseMutation() {
    const { filters } = useExpenseFilters();
    const queryKey = [EXPENSES_QUERY_KEY[0], filters]

    const { mutateAsync: deleteExpense, isPending } = useMutation({
        mutationFn: (id: string) => expenseService.delete(id),
        onMutate: (variables) => {
            const previousExpenses = queryClient.getQueryData<Expense[]>(queryKey)

            queryClient.setQueryData(queryKey, (old: Expense[]) =>
                old.filter(expense => expense.id !== variables)
            )

            return { previousExpenses }
        },
        onSuccess: (_, variables) => {
            queryClient.setQueryData(queryKey, (old: Expense[]) =>
                old.filter(expense => expense.id !== variables)
            )
            toast.success('Despesa removida com sucesso')
        },
        onError: (error, _variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousExpenses)
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message)
            } else {
                toast.error('Erro ao remover despesa')
            }
        }
    })

    return { deleteExpense, isPending }
} 