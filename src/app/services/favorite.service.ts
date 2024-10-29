import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/recipe.model';
import { Favorite } from '../models/favorite.model';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = environment.apiUrl +"/favorites/"
  token = sessionStorage.getItem('token')
   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,

});
  

  constructor(private http: HttpClient) {}



  addFavorite(recipe: string): Observable<ApiResponse<Favorite>> {    
    return this.http.post<ApiResponse<Favorite>>(this.apiUrl, {recipe},{headers:this.headers,withCredentials:true});
  }

  removeFavorite(id:string|undefined): Observable<ApiResponse<Favorite>> {
    return this.http.delete<ApiResponse<Favorite>>(this.apiUrl+id,{headers:this.headers,withCredentials:true});
  }
}
