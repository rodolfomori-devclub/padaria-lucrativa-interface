import { api } from "~/lib/axios"

export const deletePlan = async (id: string): Promise<void> => {
    await api.delete(`/plans/${id}`)
}
