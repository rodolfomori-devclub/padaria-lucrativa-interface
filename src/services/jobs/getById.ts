import { api } from "~/lib/axios"

export const getJobById = async (id: string) => {
    const { data } = await api.get(`/jobs/${id}`)
    return data.data
} 