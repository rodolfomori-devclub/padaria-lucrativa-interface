import { api } from "~/lib/axios"
import type { UpdateSupplierData } from "~/types/supplier"

export const updateSupplier = async (id: string, data: UpdateSupplierData) => {
    const response = await api.put(`/suppliers/${id}`, data)
    return response.data
} 