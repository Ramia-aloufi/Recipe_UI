import { Injectable } from "@angular/core";
import { Favorite } from "../models/favorite.model";
import { FavoriteService } from "../services/favorite.service";
import { StateService } from "../services/state.service";
import { AuthManager } from "./auth.state";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root',
  })
  export class FavoriteManager extends StateService<Favorite[]> {

  
    constructor(private service: FavoriteService,private user: AuthManager,private toastr: ToastrService) {
      super();
    }
    getFavorite(){
      this.setLoading(true);
      this.user.getState().subscribe({
        next:(data)=>{
            this.setData(data.data?.favorite || null)
        },
        error: (err:HttpErrorResponse) => {
          this.setError(err.error.message) 
        }
      })
    }
  


    deleteFavorite(id: string|undefined) {
      this.setLoading(true);
      this.service.removeFavorite(id).subscribe({
        next: (res) => {
          this.toastr.success(res.message.toString());
          this.user.getProfile()
        },
        error: (err:HttpErrorResponse) => {
          this.setError(err.error.message) 
        }
      });
    }

    addFavorite(recipe: string) {
      this.setLoading(true);
      this.service.addFavorite(recipe).subscribe({
        next: (res) => {
          this.toastr.success(res.message.toString());
          this.user.getProfile()
        },
        error: (err:HttpErrorResponse) => {
          this.setError(err.error.message) 
        }
      });
    }
  }