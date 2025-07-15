import { api } from "~/lib/axios"
import type { ProfitMargin } from "~/types/profit-margin"

export const getAllProfitMargins = async (): Promise<ProfitMargin[]> => {
    const response = await api.get('/profit-margins')
    return response.data
} 