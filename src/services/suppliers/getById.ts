import { api } from "~/lib/axios"

export const getSupplierById = async (id: string) => {
    const response = await api.get(`/suppliers/${id}`)
    return response.data
} 