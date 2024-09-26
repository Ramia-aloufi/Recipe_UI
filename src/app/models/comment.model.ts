import { Recipe } from "./recipe.model";
import { User } from "./user.model";

export interface Comment  {
    user: User;
    recipe: Recipe;
    commentText: string;
}