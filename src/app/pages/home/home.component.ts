import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { RecipeManager } from '../../states/recipe.state';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CategoriesComponent, RecipeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  state$ = this.recipeManager.getState()

  constructor(private recipeManager:RecipeManager){ }



  }


