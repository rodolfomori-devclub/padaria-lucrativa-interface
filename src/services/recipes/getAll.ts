import { api } from "~/lib/axios"

export const getAllRecipes = async () => {
    const response = await api.get('/recipes')
    return response.data
}