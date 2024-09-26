export interface User {
    username: string;
    email: string;
    password: string;
    role: Role;
    bio: string;
    profileImage: string;
  }

  export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
  }