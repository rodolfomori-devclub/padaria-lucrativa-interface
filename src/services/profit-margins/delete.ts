import { api } from "~/lib/axios"

export const deleteProfitMargin = async (id: string) => {
    const response = await api.delete(`/profit-margins/${id}`)
    return response.data
} 