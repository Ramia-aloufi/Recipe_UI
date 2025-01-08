import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { StateService } from '../services/state.service';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthManager } from './auth.state';

@Injectable({
  providedIn: 'root',
})
export class RecipeManager extends StateService<Recipe[]> {
  private recipeToUpdate$ = new BehaviorSubject<Recipe | null>(null);

  recipe$ = new BehaviorSubject<Recipe | null>(null);
  category$ = new BehaviorSubject<Category | null>(null);
  all$ = new BehaviorSubject<Recipe[] | null>(null);
  recipeID$ = new BehaviorSubject<string>('');
  recipeData = this.recipeToUpdate$.asObservable()




  constructor(private service: RecipeService, private toastr: ToastrService,private auth:AuthManager) {
    super();
  }

  loadRecipes(_page: number = 1) {
    if (!navigator.onLine) {
      this.toastr.error('No internet connection. Please check your network.');
      this.setLoading(false);
      return;
    }
    this.setLoading(true);
    this.service.getRecipes(_page).subscribe({
      next: (res) => {
        this.setData(res.data);
        this.all$.next(res.data)
        this.setMeta(res.meta)
      },
      error: (err) => {
        console.log(err);
        
        this.setError(err.error.message)
        this.toastr.error(err.error.message 
          
        );
      }
    });
  }

  updateRecipe(recipe: FormData, id: string) {
    this.setLoading(true);
    this.service.updateRecipe(recipe, id).subscribe({
      next: (res) => {
        this.toastr.success(res.message.toString());
        this.loadRecipes();
        this.auth.getProfile()
        this.recipeToUpdate$.next(null);
        this.getRecipe(this.recipeID$.getValue())

      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message)
        this.toastr.error(err.error.message);

      }
    });
  }
  deleteRecipe(recipe: Recipe) {
    this.setLoading(true);
    this.service.deleteRecipe(recipe._id).subscribe({
      next: (res) => {
        this.toastr.success(res.message.toString());
        this.loadRecipes();
        this.auth.getProfile()
      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message)
        this.toastr.success(err.error.message);

      }
    });
  }
  getRecipe(id: string) {
    this.setLoading(true);
    this.service.getRecipeById(id).subscribe({
      next: (res) => {
        this.recipe$.next(res.data);
        this.setLoading(false);

      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message)
        this.setLoading(false);

      }
    });
  }
  addRecipe(recipe: FormData) {
    this.setLoading(true);
    this.service.addRecipe(recipe).subscribe({
      next: (res) => {
        this.toastr.success(res.message.toString());
        this.loadRecipes()
        this.auth.getProfile()
      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message)
      }
    });
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
