import { api } from "~/lib/axios"
import type { CreateRecipeData } from "~/types/recipe"

export const createRecipe = async (data: CreateRecipeData) => {
    const response = await api.post('/recipes', data)
    return response.data
}