import { Injectable } from "@angular/core";
import { Favorite } from "../models/favorite.model";
import { Recipe } from "../models/recipe.model";
import { FavoriteService } from "../services/favorite.service";
import { StateService } from "../services/state.service";

@Injectable({
    providedIn: 'root',
  })
  export class FavoriteManager extends StateService<Favorite[]> {

  
    constructor(private service: FavoriteService) {
      super();
    }
  


    deleteFavorite(id: string) {
      this.setLoading(true);
      this.service.removeFavorite(id).subscribe({
        next: (_) => {
        //   this.loadCategory();
        },
        error: (err) => {
          this.setError(err.error.message);
        },
      });
      this.setLoading(false);
    }

    addFavorite(recipe: string) {
      this.setLoading(true);
      this.service.addFavorite(recipe).subscribe({
        next: (_) => {
        //   this.loadCategory();
        },
        error: (err) => {
          this.setError(err.error.message);
        },
      });
      this.setLoading(false);
    }
  }