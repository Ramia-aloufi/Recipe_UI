import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api.model";
import { User, UserAdmin } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = environment.apiUrl + "/users/"
    private token = sessionStorage.getItem('token')
    private headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'

    });
    constructor(private http: HttpClient) { }
    // Get all users
    getAll(): Observable<ApiResponse<UserAdmin[] | null>> {
        return this.http.get<ApiResponse<UserAdmin[] | null>>(this.apiUrl+"all",{headers:this.headers});
    }
    // Get one user
    getOne(name:string): Observable<ApiResponse<User | null>> {
        return this.http.get<ApiResponse<User | null>>(this.apiUrl + 'view/' + name,{headers:this.headers});
    }
    // Follow user by name by the user already logged in
    follow(name:string): Observable<ApiResponse<User | null>> {
        return this.http.put<ApiResponse<User | null>>(this.apiUrl + 'follow/' + name,{headers:this.headers});
    }
    // unFollow user by name  by the user already logged in
    unfollow(name:string): Observable<ApiResponse<User | null>> {
        console.log(this.token);
        
        return this.http.put<ApiResponse<User | null>>(this.apiUrl + 'unfollow/' + name,{headers:this.headers});
    }

}