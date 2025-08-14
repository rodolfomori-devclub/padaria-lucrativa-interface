import { api } from "~/lib/axios"
import type { User } from "~/types/user"

export const getClientById = async (id: string): Promise<User> => {
    const { data } = await api.get(`/users/${id}`)
    return data
}
