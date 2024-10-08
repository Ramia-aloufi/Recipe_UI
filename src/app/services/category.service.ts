import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { ApiResponse } from '../models/api.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {IState} from '../states/app.state'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl +"/categories/"
  token = sessionStorage.getItem('token')
   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // Get all category
  getCategories(): Observable<ApiResponse<Category[] | null>> {
    return this.http.get<ApiResponse<Category[] | null>>(this.apiUrl);
  }

  // Get a single category by ID
  getCategoryById(id: string): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/${id}`,{headers:this.headers});
  }

  // Add a new category
  addCategory(category: string): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(this.apiUrl, category,{headers:this.headers});
  }

  // Update an existing category
  updateCategory(category: Category): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(this.apiUrl + category._id, category,{headers:this.headers});
  }

  // Delete a category
  deleteCategory(id: string): Observable<ApiResponse<Category>> {
    return this.http.delete<ApiResponse<Category>>(this.apiUrl+id,{headers:this.headers});
  }
}
