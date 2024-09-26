import { createSelector } from "@ngrx/store";
import { RecipeState } from "./recipe.reducer";
import { AppState } from "../app.state";

export const selectRecipes = (state: AppState) => state.recipes

export const selectAllRecipes = createSelector(selectRecipes,(state: RecipeState) => state.recipes)
export const selectSingleRecipes = createSelector(selectRecipes,(state: RecipeState) => state.singleRecipe)
export const searchRecipes = createSelector(selectRecipes,(state: RecipeState) => state.filteredRecipes)