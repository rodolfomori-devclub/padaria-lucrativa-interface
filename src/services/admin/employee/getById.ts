import { api } from "~/lib/axios"
import type { User } from "~/types/user"

export const getById = async (id: string): Promise<User> => {
    const { data } = await api.get(`/admin/employees/${id}`)
    return data
}
