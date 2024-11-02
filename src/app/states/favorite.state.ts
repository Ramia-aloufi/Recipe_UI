import { Injectable } from "@angular/core";
import { Favorite } from "../models/favorite.model";
import { FavoriteService } from "../services/favorite.service";
import { StateService } from "../services/state.service";
import { AuthManager } from "./auth.state";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
  export class FavoriteManager extends StateService<Favorite[]> {

  
    constructor(private service: FavoriteService,private user: AuthManager) {
      super();
    }
    getFavorite(){
      this.setLoading(true);
      this.user.getState().subscribe({
        next:(data)=>{
            this.setData(data.data?.favorite || null)
            this.setLoading(false);
        },
        error: (err:HttpErrorResponse) => {
          this.setError(err.error.message) 
          this.setLoading(false)
        }
      })
    }
  


    deleteFavorite(id: string|undefined) {
      this.setLoading(true);
      this.service.removeFavorite(id).subscribe({
        next: (_) => {
          this.setLoading(false);
          this.user.getProfile()
        },
        error: (err:HttpErrorResponse) => {
          this.setError(err.error.message) 
          this.setLoading(false)
        }
      });
      this.setLoading(false);
    }

    addFavorite(recipe: string) {
      this.setLoading(true);
      this.service.addFavorite(recipe).subscribe({
        next: (_) => {
          this.setLoading(false);
          this.user.getProfile()
        },
        error: (err:HttpErrorResponse) => {
          this.setError(err.error.message) 
          this.setLoading(false)
        }
      });
      this.setLoading(false);
    }
  }