import { api } from "~/lib/axios"
import type { Plan, UpdatePlanData } from "~/types/plan"

export const updatePlan = async (id: string, data: UpdatePlanData): Promise<Plan> => {
    const response = await api.put(`/plans/${id}`, data)
    return response.data
}
