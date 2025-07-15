import { api } from "~/lib/axios"
import type { CreateInputData } from "~/types/input"

export const createInput = async (data: CreateInputData) => {
    const response = await api.post('/inputs', data)
    return response.data
} 