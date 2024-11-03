import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Recipe } from "../models/recipe.model";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
  export class TokenManager  {

   set(token:string){
    sessionStorage.setItem("token",token)
   }
   get(){
    return sessionStorage.getItem("token")
   }
   remove(){
    sessionStorage.removeItem("token")
   }
   header():HttpHeaders{
    console.log(this.get());
   return new HttpHeaders({
        'Authorization': `Bearer ${this.get()}`,
        // 'Content-Type': 'application/json'
      });
   }
  }