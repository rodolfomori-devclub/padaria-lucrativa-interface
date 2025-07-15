import { api } from "~/lib/axios"

export const getAllSuppliers = async () => {
    const response = await api.get('/suppliers')
    return response.data
} 