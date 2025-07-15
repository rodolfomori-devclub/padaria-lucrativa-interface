import { api } from "~/lib/axios"
import type { ExpenseFilters } from "~/types/expense"

export const getAllExpenses = async (filters?: ExpenseFilters) => {
    const params = new URLSearchParams()

    if (filters) {
        params.append('isFixed', filters.isFixed.toString())
        if (filters.month) params.append('month', filters.month.toString())
        if (filters.year) params.append('year', filters.year.toString())
        if (filters.fromDate) params.append('fromDate', filters.fromDate.toISOString())
        if (filters.toDate) params.append('toDate', filters.toDate.toISOString())
    }
    const { data } = await api.get(`/expenses?${params.toString()}`)
    return data.data
} 