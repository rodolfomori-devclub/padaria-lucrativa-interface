import { useQuery } from '@tanstack/react-query'
import { expenseService } from '~/services/expenses'
import type { Expense, ExpenseFilters } from '~/types/expense'
import { EXPENSES_QUERY_KEY } from './useCreateExpenseMutation'

export const useExpenses = (filters?: ExpenseFilters) => {
    const queryKey = filters
        ? [EXPENSES_QUERY_KEY[0], filters]
        : EXPENSES_QUERY_KEY

    const {
        data: expenses = [],
        isLoading,
        error,
    } = useQuery({
        queryKey,
        queryFn: async (): Promise<Expense[]> => {
            const response = await expenseService.getAll(filters)
            return response
        },
    })

    return {
        expenses,
        isLoading,
        error,
    }
} 