import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "~/lib/queryClient";
import { recipeService } from "~/services/recipes";
import type { Recipe, UpdateRecipeData } from "~/types/recipe";
import { RECIPES_QUERY_KEY } from "./useRecipes";

interface UpdateRecipeVariables {
    id: string;
    data: UpdateRecipeData;
}

export function useUpdateRecipeMutation() {
    const { mutateAsync: updateRecipe, isPending } = useMutation({
        mutationFn: async ({ id, data }: UpdateRecipeVariables) => {
            return await recipeService.update(id, data);
        },
        onMutate: async (variables) => {
            const previousRecipes = queryClient.getQueryData<Recipe[]>(RECIPES_QUERY_KEY);
            const previousRecipe = queryClient.getQueryData<Recipe>([RECIPES_QUERY_KEY, variables.id]);

            // Optimistically update recipes list
            if (previousRecipes) {
                queryClient.setQueryData<Recipe[]>(RECIPES_QUERY_KEY, (old) =>
                    old?.map(recipe =>
                        recipe.id === variables.id
                            ? { ...recipe, ...variables.data, updatedAt: new Date() }
                            : recipe
                    ) ?? []
                );
            }

            // Optimistically update single recipe if it exists in cache
            if (previousRecipe) {
                queryClient.setQueryData<Recipe>([RECIPES_QUERY_KEY, variables.id], {
                    ...previousRecipe,
                    ...variables.data,
                    updatedAt: new Date()
                });
            }

            return { previousRecipes, previousRecipe };
        },
        onSuccess: (data, variables) => {
            // Update both the list and individual recipe cache with real data
            queryClient.setQueryData<Recipe[]>(RECIPES_QUERY_KEY, (old) =>
                old?.map(recipe => recipe.id === variables.id ? data : recipe) ?? []
            );

            queryClient.setQueryData<Recipe>([RECIPES_QUERY_KEY, variables.id], data);

            toast.success('Receita atualizada com sucesso');
        },
        onError: (_error, variables, context) => {
            // Rollback optimistic updates
            if (context?.previousRecipes) {
                queryClient.setQueryData(RECIPES_QUERY_KEY, context.previousRecipes);
            }
            if (context?.previousRecipe) {
                queryClient.setQueryData([RECIPES_QUERY_KEY, variables.id], context.previousRecipe);
            }

            toast.error('Erro ao atualizar receita');
        }
    });

    return { updateRecipe, isPending };
} 