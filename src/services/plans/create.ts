import { api } from "~/lib/axios"
import type { CreatePlanData, Plan } from "~/types/plan"

export const createPlan = async (data: CreatePlanData): Promise<Plan> => {
    const response = await api.post('/plans', data)
    return response.data
}
