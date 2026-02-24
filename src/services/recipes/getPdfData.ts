import { api } from "~/lib/axios"
import type { RecipePdfData } from "~/types/recipe"

export const getRecipePdfData = async (id: string): Promise<RecipePdfData> => {
    const response = await api.get(`/recipes/${id}/pdf-data`)
    return response.data
}
