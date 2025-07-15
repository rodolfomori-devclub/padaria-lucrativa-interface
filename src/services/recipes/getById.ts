import { api } from "~/lib/axios"

export const getRecipeById = async (id: string) => {
    const response = await api.get(`/recipes/${id}`)
    return response.data
}