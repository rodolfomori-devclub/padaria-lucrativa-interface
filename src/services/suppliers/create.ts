import { api } from "~/lib/axios"
import type { CreateSupplierData } from "~/types/supplier"

export const createSupplier = async (data: CreateSupplierData) => {
    const response = await api.post('/suppliers', data)
    return response.data
} 