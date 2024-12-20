import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/api.model';
import { TokenManager } from '../states/token.state';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = environment.apiUrl + "/recipes/"

  constructor(private http: HttpClient,private token:TokenManager) {}

  // Get all recipes
  getRecipes( page:number = 1): Observable<ApiResponse<Recipe[]>> {
    var pageSize = 10
    return this.http.get<ApiResponse<Recipe[]>>(`${this.apiUrl}?page=${page}&size=${pageSize}`);
  }

  // Get a single recipe by ID
  getRecipeById(id: string): Observable<ApiResponse<Recipe>> {
    return this.http.get<ApiResponse<Recipe>>(this.apiUrl + id);
  }

  // Add a new recipe
  addRecipe(recipe: FormData): Observable<ApiResponse<Recipe>> {
    return this.http.post<ApiResponse<Recipe>>(this.apiUrl, recipe,{headers:this.token.header()});
  }

  // Update an existing recipe
  updateRecipe(recipe: FormData,id:string): Observable<ApiResponse<Recipe>> {
    return this.http.put<ApiResponse<Recipe>>(this.apiUrl + id, recipe,{headers:this.token.header()});
  }
  // Delete a recipe
  deleteRecipe(id: string): Observable<ApiResponse<Recipe>> {
    return this.http.delete<ApiResponse<Recipe>>(this.apiUrl + id,{headers:this.token.header()});
  }
}
