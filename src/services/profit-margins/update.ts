import { api } from "~/lib/axios"
import type { UpdateProfitMarginData } from "~/types/profit-margin"

export const updateProfitMargin = async (id: string, data: UpdateProfitMarginData) => {
    const response = await api.put(`/profit-margins/${id}`, data)
    return response.data
} 