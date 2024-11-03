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
  private apiUrl = environment.apiUrl +"/favorites/"

  constructor(private http: HttpClient,private token:TokenManager) {}


  addFavorite(recipe: string): Observable<ApiResponse<Favorite>> {    
    return this.http.post<ApiResponse<Favorite>>(this.apiUrl, {recipe},{headers:this.token.header()});
  }

  removeFavorite(id:string|undefined): Observable<ApiResponse<Favorite>> {
    return this.http.delete<ApiResponse<Favorite>>(this.apiUrl+id,{headers:this.token.header()});
  }
}
