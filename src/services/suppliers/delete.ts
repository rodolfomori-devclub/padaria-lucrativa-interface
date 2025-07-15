import { api } from "~/lib/axios"

export const deleteSupplier = async (id: string) => {
    const response = await api.delete(`/suppliers/${id}`)
    return response.data
} 