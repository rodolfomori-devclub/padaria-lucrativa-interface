import { api } from "~/lib/axios"
import type { CreateProfitMarginData } from "~/types/profit-margin"

export const createProfitMargin = async (data: CreateProfitMarginData) => {
    const response = await api.post('/profit-margins', data)
    return response.data
} 