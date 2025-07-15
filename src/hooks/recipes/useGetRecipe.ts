import { useQuery } from "@tanstack/react-query"
import { recipeService } from "~/services/recipes"
import { RECIPES_QUERY_KEY } from "./useRecipes"


export const useGetRecipe = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: [RECIPES_QUERY_KEY, id],
        queryFn: async () => {
            const response = await recipeService.getById(id)
            return response
        },
        enabled: !!id,
    })

    return { data, isLoading, error }
}   