import { api } from "~/lib/axios"
import type { UpdateLossControlData } from "~/types/loss-control"

export const updateLossControl = async (id: string, data: UpdateLossControlData) => {
    const response = await api.put(`/loss-control/${id}`, data)
    return response.data
} 