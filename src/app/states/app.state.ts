import { CategoryState } from "./categories/category.reducer";
import { RecipeState } from "./recipes/recipe.reducer";
import { UserState } from "./user/user.reducer";

export interface AppState {
    recipes: RecipeState,
    categories: CategoryState
    user: UserState


}