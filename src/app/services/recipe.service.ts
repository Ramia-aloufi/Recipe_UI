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
  token = sessionStorage.getItem('token')
   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

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
  addRecipe(recipe: Recipe): Observable<ApiResponse<Recipe>> {
    return this.http.post<ApiResponse<Recipe>>(this.apiUrl, recipe,{headers:this.headers});
  }

  // Update an existing recipe
  updateRecipe(recipe: Recipe): Observable<ApiResponse<Recipe>> {
    return this.http.put<ApiResponse<Recipe>>(this.apiUrl + recipe._id, recipe);
  }
  // Delete a recipe
  deleteRecipe(id: string): Observable<ApiResponse<Recipe>> {
    return this.http.delete<ApiResponse<Recipe>>(this.apiUrl + id);
  }
}
