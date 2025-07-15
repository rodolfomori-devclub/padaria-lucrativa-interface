import { api } from "~/lib/axios"

export const deleteJob = async (id: string) => {
    const response = await api.delete(`/jobs/${id}`)
    return response.data
} 