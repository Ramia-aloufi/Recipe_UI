import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/api.model';
import { User, UserData } from '../models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl
  private token = sessionStorage.getItem('token')
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) {
  
 }

  // Add New User
  register(user:User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl+"/users/",user);
  }
//login User
  login(data:{email: string,password:string}): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl+"/auth/login",data);
  }

  profile(tok:string|null): Observable<ApiResponse<User>> {
    this.token = tok
    return this.http.get<ApiResponse<User>>(this.apiUrl+"/users/profile",{ headers: this.headers });
  }
  admin(): Observable<ApiResponse<boolean>> {
    return this.http.get<ApiResponse<boolean>>(this.apiUrl+"/users/admin-only",{ headers: this.headers });
  }

}

