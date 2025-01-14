import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { RecipeManager } from '../../states/recipe.state';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { Recipe } from '../../models/recipe.model';
import { filter, map, take } from 'rxjs';
import { PaginationComponent } from "../../components/pagination/pagination.component";
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, CategoriesComponent, RecipeCardComponent, SpinnerComponent, PaginationComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent  {
  state$ = this.recipeManager.getState()
  recipe:Recipe[] = []
  newRecipe:Recipe[] = []

  constructor(private recipeManager: RecipeManager) { }
  onPageChange(page: number) {  
    this.recipeManager.loadRecipes(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });  
  }

}