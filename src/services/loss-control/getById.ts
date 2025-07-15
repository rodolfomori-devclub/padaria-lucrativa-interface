import { api } from "~/lib/axios"

export const getLossControlById = async (id: string) => {
    const response = await api.get(`/loss-control/${id}`)
    return response.data
} 