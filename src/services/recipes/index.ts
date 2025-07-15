import { createRecipe } from "./create"
import { deleteRecipe } from "./delete"
import { getAllRecipes } from "./getAll"
import { getRecipeById } from "./getById"
import { updateRecipe } from "./update"

export const recipeService = {
    getAll: getAllRecipes,
    create: createRecipe,
    getById: getRecipeById,
    update: updateRecipe,
    delete: deleteRecipe,
}