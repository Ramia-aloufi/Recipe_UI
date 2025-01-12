import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteManager } from '../../states/favorite.state';
import { Recipe } from '../../models/recipe.model';
import { AuthManager } from '../../states/auth.state';

@Component({
    selector: 'app-recipe-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recipe-card.component.html',
    styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  user$ = this.user.getState()

  favorite = false;
   @Input() recipe!:Recipe
  constructor(private router: Router,private favoriteManager:FavoriteManager,private user:AuthManager){

  }
  onClick(id:string){
    this.router.navigate(['/recipe/' + id]);
  }
  toggleFavorite(recipe:Recipe){
    if(!sessionStorage.getItem('token') ){
      this.router.navigate(['/auth'])
    }
    this.favoriteManager.addFavorite(recipe._id)
  }
  isFavorite(recipeId: string): boolean {
    this.user.getState().subscribe(state=>{
        this.favorite = state.data?.favorite?.some(fav => fav._id === recipeId) ?? false;
      })
      return this.favorite 
    }
  refresh(){
    this.user.getProfile()
  }
}
