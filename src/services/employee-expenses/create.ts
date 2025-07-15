import { api } from "~/lib/axios"
import type { CreateEmployeeExpenseData } from "~/types/employee-expense"

export const createEmployeeExpense = async (data: CreateEmployeeExpenseData) => {
    const response = await api.post('/employee-expenses', data)
    return response.data
} 