import { Favorite } from "./favorite.model";
import { Recipe } from "./recipe.model";

export interface User {
    username: string;
    email: string;
    bio?: string;
    password?: string;
    profileImage?: string;
    favorite?:Favorite[]
    recipes?:Recipe[]
  }

  export interface UserData {
    userName: string;
    email: string;
    img: string;
  }


