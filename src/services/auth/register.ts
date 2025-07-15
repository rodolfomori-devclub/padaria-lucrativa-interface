import { api } from "~/lib/axios"
import type { RegisterData } from "~/types/auth"

export const register = async (data: RegisterData) => {
    const { data: response } = await api.post('/auth/register', data)
    return response
}