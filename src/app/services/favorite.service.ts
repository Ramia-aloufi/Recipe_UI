import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/recipe.model';
import { Favorite } from '../models/favorite.model';
import { TokenManager } from '../states/token.state';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = environment.apiUrl +"/users/one"

  constructor(private http: HttpClient,private token:TokenManager) {}


  addFavorite(favorite: string): Observable<ApiResponse<Favorite>> {    
    return this.http.put<ApiResponse<Favorite>>(this.apiUrl, {favorite},{headers:this.token.header()});
  }

  removeFavorite(favorite:string|undefined): Observable<ApiResponse<Favorite>> {
    return this.http.put<ApiResponse<Favorite>>(this.apiUrl, {favorite},{headers:this.token.header()});
  }
}
