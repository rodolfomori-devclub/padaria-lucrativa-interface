import { api } from "~/lib/axios"

export const deleteRecipe = async (id: string) => {
    const response = await api.delete(`/recipes/${id}`)
    return response.data
}