import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsideComponent } from '../aside/aside.component';
import { RecipeManager } from '../../../states/recipe.state';
import { Recipe } from '../../../models/recipe.model';
import { RecipeFormComponent } from '../../../components/recipe-form/recipe-form.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [AsideComponent,CommonModule,FormsModule ,RecipeFormComponent],
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
  isShowForm = false

  isShowDetails = false
  constructor(private state:RecipeManager){
    this.state.loadRecipes()

  }

  isEditing(recipe:Recipe) {
    this.recipeDetails = recipe
    this.isShowForm = true
    this.state.setRecipe(recipe)
  }
  saveCell() {
    this.editing = !this.editing
    // this.state.updateRecipe(this.updatedCategory)

  }
  onDelete(recipe:Recipe){
    // this.state.deleteRecipe(category)
  }
  showForm(){
    this.state.clearRecipe()
    this.isShowForm = !this.isShowForm
  }
  showDetails(row:number,recipe:Recipe){    
    this.rowNum = row
    this.recipeDetails = recipe
    this.isShowDetails = !this.isShowDetails
  }

}
