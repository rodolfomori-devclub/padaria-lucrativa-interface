import { api } from "~/lib/axios"
import type { UpdateBoletoData } from "~/types/boleto"

export const updateBoleto = async (id: string, data: UpdateBoletoData) => {
    const response = await api.patch(`/bills/${id}`, data)
    return response.data
} 