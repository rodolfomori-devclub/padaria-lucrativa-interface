import { api } from "~/lib/axios"
import type { LoginData } from "~/types/auth"

export const login = async (data: LoginData) => {
    const response = await api.post('/auth/login', data)
    return response.data
}