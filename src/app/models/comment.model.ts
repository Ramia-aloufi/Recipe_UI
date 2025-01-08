import { Recipe } from "./recipe.model";
import { User } from "./user.model";

export interface IComment  {
    _id:string
    user: User;
    recipe: string;
    commentText: string;
}