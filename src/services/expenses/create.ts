import { api } from "~/lib/axios"
import type { CreateExpenseData } from "~/types/expense"

export const createExpense = async (data: CreateExpenseData) => {
    const response = await api.post('/expenses', data)
    return response.data
} 