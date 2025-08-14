import { api } from "~/lib/axios"
import type { UpdateClientData } from "~/types/client"
import type { User } from "~/types/user"

export const updateClient = async (id: string, data: UpdateClientData): Promise<User> => {
    const { data: response } = await api.put(`/users/${id}`, data)
    return response
}
