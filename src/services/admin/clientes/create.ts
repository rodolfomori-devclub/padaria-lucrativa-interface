import { api } from "~/lib/axios"
import type { CreateClientData } from "~/types/client"
import type { User } from "~/types/user"

export const createClient = async (data: CreateClientData): Promise<User> => {
    const response = await api.post('/users', data)
    return response.data.user
}
