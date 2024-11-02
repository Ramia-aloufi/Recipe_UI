import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { Router } from '@angular/router';
import { FavoriteManager } from '../../states/favorite.state';
import { RecipeManager } from '../../states/recipe.state';
import { Recipe } from '../../models/recipe.model';
import { AuthManager } from '../../states/auth.state';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule,CategoriesComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  recipeFavorite$ = this.favoriteManager.getState()

  favorite = false;
   @Input() recipe!:Recipe
  constructor(private router: Router, private recipeManager:RecipeManager,private favoriteManager:FavoriteManager,private user:AuthManager){

  }
  onClick(id:string){
    this.router.navigate(['/recipe/' + id]);
  }
  addToFavorite(recipe:Recipe){
    this.favoriteManager.addFavorite(recipe._id)
    this.refresh()  
  }
  removeFavorite(recipe:Recipe){
    var id :string|undefined= undefined
    this.recipeFavorite$.subscribe(data => {
      if(data.data)
       id = data.data?.find(fav => fav?.recipe?._id === recipe._id)?._id   
    })
    this.favoriteManager.deleteFavorite(id)
  }
  isFavorite(recipeId: string): boolean {
    this.user.getState().subscribe(state=>{
        this.favorite = state.data?.favorite?.some(fav => fav?.recipe?._id === recipeId) ?? false;
      })
      return this.favorite 
    }
  refresh(){
    this.user.getProfile()
  }
}
