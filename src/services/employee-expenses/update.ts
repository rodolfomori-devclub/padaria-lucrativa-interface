import { api } from "~/lib/axios"
import type { UpdateEmployeeExpenseData } from "~/types/employee-expense"

export const updateEmployeeExpense = async (id: string, data: UpdateEmployeeExpenseData) => {
    const response = await api.patch(`/employee-expenses/${id}`, data)
    return response.data
} 