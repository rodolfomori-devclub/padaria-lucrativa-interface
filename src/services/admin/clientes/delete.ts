import { api } from "~/lib/axios"

export const deleteClient = async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`/users/${id}`)
    return data
}
