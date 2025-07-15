import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { recipeService } from "~/services/recipes";
import type { Recipe } from "~/types/recipe";
import { RECIPES_QUERY_KEY } from "./useRecipes";


export function useDeleteRecipeMutation() {
    const { mutateAsync: deleteRecipe, isPending } = useMutation({
        mutationFn: (id: string) => recipeService.delete(id),
        onMutate: (variables) => {
            const previousRecipes = queryClient.getQueryData<Recipe[]>(RECIPES_QUERY_KEY)

            queryClient.setQueryData(RECIPES_QUERY_KEY, (old: Recipe[]) => old.map(recipe => recipe.id === variables ? { ...recipe, inputs: [] } : recipe))

            return { previousRecipes }
        },
        onSuccess: (data, variables) => {
            queryClient.setQueryData(RECIPES_QUERY_KEY, (old: Recipe[]) => old.map(recipe => recipe.id === variables ? data : recipe))
            toast.success('Insumo removido da receita com sucesso')
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(RECIPES_QUERY_KEY, context?.previousRecipes)
            toast.error('Erro ao remover insumo da receita')
        }
    })

    return { deleteRecipe, isPending }
}