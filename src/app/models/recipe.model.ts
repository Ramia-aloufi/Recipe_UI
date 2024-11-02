import { Category } from "./category.model";
import { Comment } from "./comment.model";
import { User } from "./user.model";





export interface Recipe {
        _id:string
        title: string;
        description: string;
        preparationTime: number;
        cookingTime: number;
        servings: number;
        chef: User
        category: Category
        media: string[];
        ingredients: string[];
        steps: string[];
        comments: Comment[];
    }
