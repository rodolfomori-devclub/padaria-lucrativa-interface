import { api } from "~/lib/axios"

export const getAllInputs = async () => {
    const response = await api.get('/inputs')
    return response.data
} 