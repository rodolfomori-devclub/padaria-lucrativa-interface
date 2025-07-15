import { api } from "~/lib/axios"

export const getBoletoById = async (id: string) => {
    const response = await api.get(`/bills/${id}`)
    return response.data
} 