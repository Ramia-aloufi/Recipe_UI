import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { ApiResponse } from '../models/api.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TokenManager } from '../states/token.state';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl +"/categories/"

  constructor(private http: HttpClient,private token:TokenManager) {}

  // Get all category
  getCategories(): Observable<ApiResponse<Category[] | null>> {
    return this.http.get<ApiResponse<Category[] | null>>(this.apiUrl);
  }

  // Get a single category by ID
  getCategoryById(id: string): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/${id}`,{headers:this.token.header()});
  }

  // Add a new category
  addCategory(category: string): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(this.apiUrl, {name:category},{headers:this.token.header()});
  }

  // Update an existing category
  updateCategory(category: Category): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(this.apiUrl + category._id, category,{headers:this.token.header()});
  }

  // Delete a category
  deleteCategory(id: string): Observable<ApiResponse<Category>> {
    return this.http.delete<ApiResponse<Category>>(this.apiUrl+id,{headers:this.token.header()});
  }
}
