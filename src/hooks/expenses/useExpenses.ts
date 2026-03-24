import { useQuery } from '@tanstack/react-query'
import { expenseService } from '~/services/expenses'
import type { ExpenseFilters, PaginatedExpenseResponse } from '~/types/expense'
import { EXPENSES_QUERY_KEY } from './useCreateExpenseMutation'

export const useExpenses = (filters?: ExpenseFilters) => {
    const queryKey = filters
        ? [EXPENSES_QUERY_KEY[0], filters]
        : EXPENSES_QUERY_KEY

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey,
        queryFn: async (): Promise<PaginatedExpenseResponse> => {
            return await expenseService.getAll(filters)
        },
    })

    const total = data?.data.reduce((acc, expense) => acc + expense.value, 0) || null

    return {
        expenses: data?.data || [],
        meta: data?.meta,
        isLoading,
        error,
        total,
    }
} 