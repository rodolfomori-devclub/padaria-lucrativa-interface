import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { recipeService } from "~/services/recipes";
import type { CreateRecipeData, Recipe } from "~/types/recipe";
import { RECIPES_QUERY_KEY } from "./useRecipes";


export function useCreateInputMutation() {
    const { mutateAsync: createInput, isPending } = useMutation({
        mutationFn: (data: CreateRecipeData) => recipeService.create(data),
        onMutate: (variables) => {
            const tempRecipeId = Math.random().toString();

            const previousRecipes = queryClient.getQueryData<Recipe[]>(RECIPES_QUERY_KEY)

            queryClient.setQueryData(RECIPES_QUERY_KEY, (old: Recipe[]) => [...old, {
                ...variables,
                id: tempRecipeId,
                createdAt: new Date(),
                updatedAt: new Date(),
                inputs: []
            }])

            return { previousRecipes, tempRecipeId }
        },
        onSuccess: (data, _variables, context) => {
            queryClient.setQueryData(RECIPES_QUERY_KEY, (old: Recipe[]) => old.map(recipe => recipe.id === context?.tempRecipeId ? data : recipe))
            toast.success('Receita criada com sucesso')
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(RECIPES_QUERY_KEY, context?.previousRecipes)
            toast.error('Erro ao criar receita')
        }
    })

    return { createInput, isPending }
}