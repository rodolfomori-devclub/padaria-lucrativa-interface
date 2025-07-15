import { api } from "~/lib/axios"
import type { ProfitMargin } from "~/types/profit-margin"

export const getProfitMarginById = async (id: string): Promise<ProfitMargin> => {
    const response = await api.get(`/profit-margins/${id}`)
    return response.data
} 