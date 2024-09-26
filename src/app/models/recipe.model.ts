import { Category } from "./category.model";
import { Comment } from "./comment.model";
import { User } from "./user.model";




export interface Media {
    mediaType: MediaType;
    mediaUrl: string;
    order: number;
}
export enum MediaType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
}
export enum Unit {
    G = 'G',
    KG = 'KG',
    ML = 'ML',
    L = 'L',
    CUP = 'CUP',
    TBSP = 'TBSP',
    TSP = 'TSP'
}

export interface Ingredient {
    name: string;
    quantity: number;
    unit: Unit;
}
export interface Step  {
    stepNumber: number;
    instruction: string;
}



export interface Recipe {
        _id:string
        title: string;
        preparationTime: number;
        cookingTime: number;
        servings: number;
        chef: User
        category: Category
        media: Media[];
        ingredients: Ingredient[];
        steps: Step[];
        comments: Comment[];
    }
