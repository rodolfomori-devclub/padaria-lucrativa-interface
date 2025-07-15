import { api } from "~/lib/axios"

export const deleteLossControl = async (id: string) => {
    const response = await api.delete(`/loss-control/${id}`)
    return response.data
} 