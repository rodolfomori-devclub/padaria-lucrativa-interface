import { api } from "~/lib/axios"
import type { UpdateJobData } from "~/types/job"

export const updateJob = async (id: string, data: UpdateJobData) => {
    const response = await api.patch(`/jobs/${id}`, data)
    return response.data
} 