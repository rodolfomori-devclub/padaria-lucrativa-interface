import { api } from "~/lib/axios"

export const getExpenseById = async (id: string) => {
    const response = await api.get(`/expenses/${id}`)
    return response.data
} 