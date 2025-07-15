import { api } from "~/lib/axios"

export const deleteExpense = async (id: string) => {
    const response = await api.delete(`/expenses/${id}`)
    return response.data
} 