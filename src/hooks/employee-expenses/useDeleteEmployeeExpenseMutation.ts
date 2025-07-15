import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEmployeeExpenseFilters } from "~/hooks/filters/employee-expense-filters";
import { queryClient } from "~/lib/queryClient";
import { employeeExpenseService } from "~/services/employee-expenses";
import type { EmployeeExpense } from "~/types/employee-expense";
import { EMPLOYEE_EXPENSES_QUERY_KEY } from "./useCreateEmployeeExpenseMutation";

export function useDeleteEmployeeExpenseMutation() {
    const { filters } = useEmployeeExpenseFilters();
    const queryKey = [EMPLOYEE_EXPENSES_QUERY_KEY[0], filters]

    const { mutateAsync: deleteEmployeeExpense, isPending } = useMutation({
        mutationFn: (id: string) => employeeExpenseService.delete(id),
        onMutate: async (id) => {
            const previousEmployeeExpenses = queryClient.getQueryData<EmployeeExpense[]>(queryKey);

            queryClient.setQueryData<EmployeeExpense[]>(queryKey, (old) =>
                old?.filter(expense => expense.id !== id) ?? []
            );

            return { previousEmployeeExpenses };
        },
        onSuccess: () => {
            toast.success('Despesa com pessoal excluída com sucesso');
        },
        onError: (_error, _variables, context) => {
            if (context?.previousEmployeeExpenses) {
                queryClient.setQueryData(queryKey, context.previousEmployeeExpenses);
            }
            toast.error('Erro ao excluir despesa com pessoal');
        }
    });

    return { deleteEmployeeExpense, isPending };
} 