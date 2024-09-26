import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = environment.apiUrl + "/recipes/"

  constructor(private http: HttpClient) {}

  // Get all recipes
  getRecipes(): Observable<ApiResponse<Recipe[]>> {
    return this.http.get<ApiResponse<Recipe[]>>(this.apiUrl);
  }

  // Get a single recipe by ID
  getRecipeById(id: string): Observable<ApiResponse<Recipe>> {
    return this.http.get<ApiResponse<Recipe>>(this.apiUrl + id);
  }

  // Add a new recipe
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  // Update an existing recipe
  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Recipe>(url, recipe);
  }
  // Delete a recipe
  deleteRecipe(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
