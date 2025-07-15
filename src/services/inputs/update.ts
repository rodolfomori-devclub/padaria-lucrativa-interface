import { api } from "~/lib/axios"
import type { UpdateInputData } from "~/types/input"

export const updateInput = async (id: string, data: UpdateInputData) => {
    const response = await api.put(`/inputs/${id}`, data)
    return response.data
} 