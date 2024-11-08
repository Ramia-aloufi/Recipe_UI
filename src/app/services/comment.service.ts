import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.model';
import { environment } from '../../environments/environment';
import { TokenManager } from '../states/token.state';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = environment.apiUrl+'/comments/'

  constructor(private http:HttpClient,private token:TokenManager) { }

  newComment(data:{text:string,recipe:string}):Observable<ApiResponse<Comment>>{
    return this.http.post<ApiResponse<Comment>>(this.url,data,{headers:this.token.header()})
  }
}
