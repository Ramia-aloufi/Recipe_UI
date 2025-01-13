import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Router } from '@angular/router';
import { RecipeManager } from '../../states/recipe.state';
import { AuthManager } from '../../states/auth.state';

@Component({
    selector: 'app-profile-recipe-card',
    standalone: true,
    templateUrl: './profile-recipe-card.component.html',
    styleUrl: './profile-recipe-card.component.css'
})
export class ProfileRecipeCardComponent {
  favorite = false;
   @Input() recipe!:Recipe
  constructor(private router: Router, private recipeManager:RecipeManager,private user:AuthManager)
  { }
  onClick(id:string){
    this.router.navigate(['/recipe/' + id]);
  }
  
}


