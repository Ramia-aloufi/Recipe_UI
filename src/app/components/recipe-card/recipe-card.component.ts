import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { Router } from '@angular/router';
import { FavoriteManager } from '../../states/favorite.state';
import { RecipeManager } from '../../states/recipe.state';
import { UserManager } from '../../states/user.state';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule,CategoriesComponent],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {

  favorite = false;
   @Input() recipe!:Recipe
  constructor(private router: Router, private recipeManager:RecipeManager,private favoriteManager:FavoriteManager,private user:UserManager){

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
    this.user.user$.subscribe(data => {
       id = data?.favorite?.find(fav => fav?.recipe?._id === recipe._id)?._id     
       this.refresh()  
    })  
    this.favoriteManager.deleteFavorite(id)
  }
  isFavorite(recipeId: string): boolean {
    this.user.user$.subscribe(data => {
      this.favorite = data?.favorite?.some(fav => fav?.recipe?._id === recipeId) ?? false;
    })
    return this.favorite 
  }
  refresh(){
    this.user.getProfile()
  }
}
