import { api } from "~/lib/axios"
import type { CreateLossControlData } from "~/types/loss-control"

export const createLossControl = async (data: Omit<CreateLossControlData, 'totalValue'>) => {
    const response = await api.post('/loss-control', data)
    return response.data
} 