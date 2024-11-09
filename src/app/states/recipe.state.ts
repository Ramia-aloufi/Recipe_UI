import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { StateService } from '../services/state.service';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
  private recipeToUpdate$: BehaviorSubject<Recipe | null> =
    new BehaviorSubject<Recipe | null>(null);
   recipeID$: BehaviorSubject<string > =
    new BehaviorSubject<string >('');
  recipeData = this.recipeToUpdate$.asObservable()
  constructor(private service: RecipeService, private toastr: ToastrService) {
    super();
  }

  loadRecipes() {
    this.setLoading(true);
    this.service.getRecipes().subscribe({
      next: (res) => {
        this.setData(res.data);
        this.all$.next(res.data)
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.setError(err.error.message)
        this.setLoading(false)
      }
    });
    this.setLoading(false);
  }
  updateRecipe(recipe: FormData, id: string) {
    this.setLoading(true);
    this.service.updateRecipe(recipe, id).subscribe({
      next: (res) => {
        this.toastr.success(res.message.toString());
        this.loadRecipes;
      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message)
        this.setLoading(false)
      }
    });
    this.setLoading(false);
  }
  deleteRecipe(recipe: Recipe) {
    this.setLoading(true);
    this.service.deleteRecipe(recipe._id).subscribe({
      next: (res) => {
        this.toastr.success(res.message.toString());
        this.loadRecipes();
      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message)
        this.setLoading(false)
      }
    });
    this.setLoading(false);
  }
  getRecipe(id: string) {
    this.setLoading(true);
    this.service.getRecipeById(id).subscribe({
      next: (res) => {
        this.recipe$.next(res.data);
      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message)
        this.setLoading(false)
      }
    });
    this.setLoading(false);
  }
  addRecipe(recipe: FormData) {
    this.setLoading(true);
    this.service.addRecipe(recipe).subscribe({
      next: (res) => {
        this.toastr.success(res.message.toString());
        this.loadRecipes()
      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message)
        this.setLoading(false)
      }
    });
    this.setLoading(false);
  }
  setRecipe(recipe: Recipe) {
    this.recipeToUpdate$.next(recipe)
  }
  clearRecipe() {
    this.recipeToUpdate$.next(null);
  }
  filterRecipeBy(category: Category | null) {
    const allRecipes = this.all$.getValue();
    const filteredRecipes = !category
      ? allRecipes
      : allRecipes?.filter(recipe => recipe.category?._id === category._id) || [];
    this.setData(filteredRecipes);

  }
  search(searchKey: string) {
    const allRecipes = this.all$.getValue();
    const filteredRecipes = !searchKey
      ? allRecipes
      : allRecipes?.filter(recipe => recipe.title.toLowerCase().includes(searchKey)) || [];
    this.setData(filteredRecipes);

  }
}
