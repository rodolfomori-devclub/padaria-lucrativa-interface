import { api } from "~/lib/axios"
import type { Plan } from "~/types/plan"

export const getAllPlans = async (): Promise<Plan[]> => {
    const response = await api.get('/plans')
    return response.data
}
