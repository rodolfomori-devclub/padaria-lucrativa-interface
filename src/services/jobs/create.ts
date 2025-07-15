import { api } from "~/lib/axios"
import type { CreateJobData } from "~/types/job"

export const createJob = async (data: CreateJobData) => {
    const response = await api.post('/jobs', data)
    return response.data
} 