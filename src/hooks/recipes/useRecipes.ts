import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "~/lib/axios";
import { queryClient } from "~/lib/queryClient";
import { recipeService } from "~/services/recipes";
import type {
  AddRecipeInputData,
  CreateRecipeData,
  Recipe,
  UpdateRecipeData,
} from "~/types/recipe";

export const RECIPES_QUERY_KEY = ["recipes"];

export const useRecipes = () => {
  const {
    data: recipes = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: RECIPES_QUERY_KEY,
    refetchOnWindowFocus: true,
    queryFn: async (): Promise<Recipe[]> => {
      const response = await recipeService.getAll();
      return response;
    },
  });

  // Create recipe mutation
  const createRecipeMutation = useMutation({
    mutationFn: async (data: CreateRecipeData): Promise<Recipe> => {
      const response = await recipeService.create(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY });
      toast.success("Receita criada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao criar receita");
    },
  });

  const updateRecipeMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateRecipeData;
    }): Promise<Recipe> => {
      const response = await recipeService.update(id, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY });
      toast.success("Receita atualizada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar receita");
    },
  });

  // Delete recipe mutation
  const deleteRecipeMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await recipeService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY });
      toast.success("Receita deletada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao deletar receita");
    },
  });

  // Add ingredient to recipe mutation
  const addIngredientMutation = useMutation({
    mutationFn: async ({
      recipeId,
      data,
    }: {
      recipeId: string;
      data: AddRecipeInputData;
    }): Promise<Recipe> => {
      const response = await api.put(`/receitas/${recipeId}/insumos`, data);
      return {
        ...response.data,
        recipeYield: response.data.yield,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY });
      toast.success("Ingrediente adicionado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao adicionar ingrediente");
    },
  });

  return {
    // Data
    recipes: recipes.filter((recipe) => recipe.isActive), // Only show active recipes
    allRecipes: recipes, // All recipes including inactive ones
    isLoading,
    error,

    // Actions
    refetch,
    createRecipe: createRecipeMutation.mutateAsync,
    updateRecipe: updateRecipeMutation.mutateAsync,
    deleteRecipe: deleteRecipeMutation.mutateAsync,
    addIngredient: addIngredientMutation.mutateAsync,

    // Mutation states
    isCreating: createRecipeMutation.isPending,
    isUpdating: updateRecipeMutation.isPending,
    isDeleting: deleteRecipeMutation.isPending,
    isAddingIngredient: addIngredientMutation.isPending,

    // Errors
    createError: createRecipeMutation.error,
    updateError: updateRecipeMutation.error,
    deleteError: deleteRecipeMutation.error,
    addIngredientError: addIngredientMutation.error,
  };
};
