import { CategoryState } from "./categories/category.reducer";
import { RecipeState } from "./recipes/recipe.reducer";

export interface AppState {
    recipes: RecipeState,
    categories: CategoryState

}