import { api } from "~/lib/axios"

export const me = async () => {
    const response = await api.get('/auth/me')
    return response.data
}