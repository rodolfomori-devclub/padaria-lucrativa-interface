import { api } from "~/lib/axios"
import type { Plan } from "~/types/plan"

export const getPlanById = async (id: string): Promise<Plan> => {
    const response = await api.get(`/plans/${id}`)
    return response.data
}
