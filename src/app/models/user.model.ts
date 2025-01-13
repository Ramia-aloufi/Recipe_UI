import { Recipe } from "./recipe.model";

export interface User {
    username: string;
    email: string;
    bio?: string;
    password?: string;
    profileImage?: string;
    favorite?:Recipe[]
    recipes?:Recipe[]
    following?:User[]

  }

  export interface UserData {
    userName: string;
    email: string;
    img: string;
  }

  export interface UserAdmin {
    username: string;
    email: string;
    bio?: string;
    password?: string;
    profileImage?: string;
    favorite?:Recipe[]
    recipes?:Recipe[]
    role:string
  }


