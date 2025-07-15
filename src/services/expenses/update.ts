import { api } from "~/lib/axios"
import type { UpdateExpenseData } from "~/types/expense"

export const updateExpense = async (id: string, data: UpdateExpenseData) => {
    const response = await api.put(`/expenses/${id}`, data)
    return response.data
} 