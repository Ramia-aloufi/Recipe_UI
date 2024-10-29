import { Favorite } from "./favorite.model";

export interface User {
    username: string;
    email: string;
    bio?: string;
    password?: string;
    profileImage?: string;
    favorite?:Favorite[]
  }

  export interface UserData {
    userName: string;
    email: string;
    img: string;
  }


