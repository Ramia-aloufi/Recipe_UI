import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { ApiResponse } from '../models/api.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  // Get all recipes
  getCategories(): Observable<ApiResponse<Category[]>> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<ApiResponse<Category[]>>(this.apiUrl+"/categories");
  }

  // Get a single recipe by ID
  getCategoryById(id: string): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Category>(url);
  }

  // Add a new recipe
  addCategory(recipe: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, recipe);
  }

  // Update an existing recipe
  updateCategory(id: number, recipe: Category): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Category>(url, recipe);
  }

  // Delete a recipe
  deleteCategory(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
