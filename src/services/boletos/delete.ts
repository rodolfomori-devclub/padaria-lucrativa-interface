import { api } from "~/lib/axios"

export const deleteBoleto = async (id: string) => {
    const response = await api.delete(`/bills/${id}`)
    return response.data
} 