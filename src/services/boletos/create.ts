import { api } from "~/lib/axios"
import type { CreateBoletoData } from "~/types/boleto"

export const createBoleto = async (data: CreateBoletoData) => {
    const response = await api.post('/bills', data)
    return response.data
} 