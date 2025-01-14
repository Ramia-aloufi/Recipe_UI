import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/api.model';
import { User, UserData } from '../models/user.model';
import { Observable } from 'rxjs';
import { TokenManager } from '../states/token.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private token: TokenManager) { }

  // Add New User
  register(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl + '/users/', user);
  }
  //login User
  login(data: {
    email: string;
    password: string;
  }): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      this.apiUrl + '/auth/login',
      data
    );
  }

  profile(tok: string | null): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(this.apiUrl + '/users/profile', {
      headers: this.token.header(),
    });
  }
  admin(): Observable<ApiResponse<boolean>> {
    return this.http.get<ApiResponse<boolean>>(
      this.apiUrl + '/users/admin-only',
      { headers: this.token.header() }
    );
  }
}
