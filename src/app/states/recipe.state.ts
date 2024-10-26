import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { StateService } from '../services/state.service';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeManager extends StateService<Recipe[]> {
  recipe$: BehaviorSubject<Recipe | null> =
    new BehaviorSubject<Recipe | null>(null);
    category$: BehaviorSubject<Category | null> =
    new BehaviorSubject<Category | null>(null);
    all$: BehaviorSubject<Recipe[] | null> =
    new BehaviorSubject<Recipe[] | null>(null);

    private filteredRecipe:Recipe[] | null = null
  constructor(private service: RecipeService) {
    super();
  }

  loadRecipes() {
    this.setLoading(true);
    this.service.getRecipes().subscribe({
      next: (res) => {
        this.setData(res.data);
        this.all$.next(res.data)
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }
  updateRecipe(recipe: Recipe) {
    this.setLoading(true);
    this.service.updateRecipe(recipe).subscribe({
      next: (_) => {
        this.loadRecipes;
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }
  deleteRecipe(recipe: Recipe) {
    this.setLoading(true);
    this.service.deleteRecipe(recipe._id).subscribe({
      next: (_) => {
        this.loadRecipes();
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }
  getRecipe(id: string) {
    this.setLoading(true);
    this.service.getRecipeById(id).subscribe({
      next: (res) => {
        this.recipe$.next(res.data);
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }
  addRecipe(recipe: FormData) {
    this.setLoading(true);
    this.service.addRecipe(recipe).subscribe({
      next: (_) => {
        this.loadRecipes()
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }

  filterRecipeBy(category: Category | null) {
    const allRecipes = this.all$.getValue();
    const filteredRecipes = !category
      ? allRecipes
      : allRecipes?.filter(recipe => recipe.category?._id === category._id) || [];
    this.setData(filteredRecipes); 

    }
    search(searchKey:string){        
        const allRecipes = this.all$.getValue();
        const filteredRecipes = !searchKey
        ? allRecipes
        : allRecipes?.filter(recipe => recipe.title.toLowerCase().includes(searchKey)) || [];
      this.setData(filteredRecipes); 

    }
}
