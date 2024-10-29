import { Recipe } from "./recipe.model";
import { User } from "./user.model";

export interface Favorite  {
    _id:string;
    user: User;
    recipe: Recipe;
}