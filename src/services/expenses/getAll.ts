import { api } from "~/lib/axios"
import type { ExpenseFilters, PaginatedExpenseResponse } from "~/types/expense"

export const getAllExpenses = async (filters?: ExpenseFilters): Promise<PaginatedExpenseResponse> => {
    const params = new URLSearchParams()

    if (filters) {
        params.append('isFixed', filters.isFixed.toString())
        if (filters.page) params.append('page', filters.page.toString())
        if (filters.limit) params.append('limit', filters.limit.toString())
        if (filters.month) params.append('month', filters.month.toString())
        if (filters.year) params.append('year', filters.year.toString())
        if (filters.fromDate) params.append('fromDate', filters.fromDate.toISOString())
        if (filters.toDate) params.append('toDate', filters.toDate.toISOString())
    }
    const { data } = await api.get(`/expenses?${params.toString()}`)
    return data as PaginatedExpenseResponse
} 