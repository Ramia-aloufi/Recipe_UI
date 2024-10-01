import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  // Add New User
  register(user:User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl+"/users/",user);
  }
//login User
  login(data:{email: string,password:string}): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl+"/auth/login",data,{ withCredentials: true });
  }

}

