import { api } from "~/lib/axios"
import type { EmployeeExpenseFilters, PaginatedEmployeeExpenseResponse } from "~/types/employee-expense"

export const getAllEmployeeExpenses = async (filters?: EmployeeExpenseFilters): Promise<PaginatedEmployeeExpenseResponse> => {
    const params = new URLSearchParams()

    if (filters) {
        if (filters.page) params.append('page', filters.page.toString())
        if (filters.limit) params.append('limit', filters.limit.toString())
        if (filters.month) params.append('month', filters.month.toString())
        if (filters.year) params.append('year', filters.year.toString())
        if (filters.fromDate) params.append('fromDate', filters.fromDate.toISOString())
        if (filters.toDate) params.append('toDate', filters.toDate.toISOString())
        if (filters.jobId) params.append('jobId', filters.jobId)
    }
    const { data } = await api.get(`/employee-expenses?${params.toString()}`)
    return data as PaginatedEmployeeExpenseResponse
} 