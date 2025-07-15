import { api } from "~/lib/axios"

export const deleteInput = async (id: string) => {
    const response = await api.delete(`/inputs/${id}`)
    return response.data
} 