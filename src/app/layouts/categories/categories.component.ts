import { Component, OnInit } from '@angular/core';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../../states/categories/category.selectors';
import { loadCategory } from '../../states/categories/category.action';
import { CommonModule } from '@angular/common';
import { filterRecipeByCategory, loadRecipe } from '../../states/recipes/recipe.action';
import { searchRecipes } from '../../states/recipes/recipe.selectors';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent   {
  public categories$ = this.store.select(selectAllCategories)
  public recipes$ = this.store.select(searchRecipes)

  constructor(private store:Store<AppState>){}


  onClick(category:string){
    console.log(category)
    this.store.dispatch(filterRecipeByCategory({category:category}))
    this.recipes$.subscribe(aa=>{
      console.log(aa);
      
    })
    
  }
  onReset(){
    this.store.dispatch(loadRecipe())
  }


}
