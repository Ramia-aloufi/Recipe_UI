import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/api.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { AppState } from '../states/app.state';
import { Store } from '@ngrx/store';
import { token } from '../states/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl
  token = localStorage.getItem('token')
   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
  });
  constructor(private http: HttpClient,private store:Store<AppState>) {

  console.log("token" + token);
  
 }

  // Add New User
  register(user:User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl+"/users/",user);
  }
//login User
  login(data:{email: string,password:string}): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl+"/auth/login",data,{withCredentials:true});
  }

  profile(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(this.apiUrl+"/users/profile",{ headers: this.headers,withCredentials: true });
  }

}

