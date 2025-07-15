import { useQuery } from '@tanstack/react-query'
import { expenseService } from '~/services/expenses'
import type { Expense } from '~/types/expense'
import { EXPENSES_QUERY_KEY } from './useCreateExpenseMutation'

export const useGetExpense = (id: string) => {
    const {
        data: expense,
        isLoading,
        error,
    } = useQuery({
        queryKey: [EXPENSES_QUERY_KEY, id],
        queryFn: async (): Promise<Expense> => {
            const response = await expenseService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return {
        expense,
        isLoading,
        error,
    }
} 