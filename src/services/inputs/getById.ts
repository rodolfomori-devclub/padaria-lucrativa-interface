import { api } from "~/lib/axios"

export const getInputById = async (id: string) => {
    const response = await api.get(`/inputs/${id}`)
    return response.data
} 