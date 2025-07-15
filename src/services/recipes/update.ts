import { api } from "~/lib/axios"
import type { UpdateRecipeData } from "~/types/recipe"

export const updateRecipe = async (id: string, data: UpdateRecipeData) => {
    const response = await api.put(`/recipes/${id}`, data)
    return response.data
}