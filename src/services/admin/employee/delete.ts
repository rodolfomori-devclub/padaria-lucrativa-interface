import { api } from "~/lib/axios"

export const deleteEmployee = async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`/admin/employees/${id}`)
    return data
}
