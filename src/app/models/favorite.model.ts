import { Recipe } from "./recipe.model";
import { User } from "./user.model";

export interface Favorite  {
    user: User;
    recipe: Recipe;
}