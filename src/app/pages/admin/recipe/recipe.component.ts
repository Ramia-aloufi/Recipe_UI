import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../models/category.model';
import { CategoryManager } from '../../../states/category.state';
import { AsideComponent } from '../aside/aside.component';
import { RecipeManager } from '../../../states/recipe.state';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [AsideComponent,CommonModule,FormsModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  state$ = this.state.getState()
  recipeDetails:Recipe  = {} as Recipe
  editingRow: number | null = null;
  editingCol: number | null = null;
  editing = false
  rowNum = 0
  newCategory=""
  isAddNewCategory = false

  isShowDetails = false
  constructor(private state:RecipeManager){
    this.state.loadRecipes()

  }

  isEditing(row:number,category:Recipe) {
    this.rowNum = row
    this.recipeDetails = category

    return this.editing = !this.editing
  }
  saveCell() {
    this.editing = !this.editing
    // this.state.updateRecipe(this.updatedCategory)

  }
  onDelete(recipe:Recipe){
    // this.state.deleteRecipe(category)
  }
  onSave(){
    console.log(this.newCategory);
  }
  showInput(){
    if(this.isAddNewCategory && this.newCategory.length > 3){
      // this.state.addCategory(this.newCategory)
    }
    this.isAddNewCategory = !this.isAddNewCategory
    this.newCategory = ""

  }
  showDetails(row:number,category:Recipe){    
    this.rowNum = row
    this.recipeDetails = category
    this.isShowDetails = !this.isShowDetails
  }

}
