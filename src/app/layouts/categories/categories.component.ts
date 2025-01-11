import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManager } from '../../states/category.state';
import { RecipeManager } from '../../states/recipe.state';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
})
export class CategoriesComponent   {
  public categoryState$ = this.categoryState.getState()
  public recipeState$ = this.recipeState.getState()
  selectedCategory:String|undefined = undefined
  constructor( private categoryState:CategoryManager, private recipeState:RecipeManager){
    this.categoryState.loadCategory()   

  }


  onFilter(category:Category | null){ 
    this.selectedCategory = category?._id   
    this.recipeState.filterRecipeBy(category)    
  }


}
