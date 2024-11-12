import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api.model";
import { User, UserAdmin } from "../models/user.model";
import { TokenManager } from "../states/token.state";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = environment.apiUrl + "/users/"

    constructor(private http: HttpClient,private token:TokenManager) { }
    // Get all users
    getAll(): Observable<ApiResponse<UserAdmin[] | null>> {
        return this.http.get<ApiResponse<UserAdmin[] | null>>(this.apiUrl+"all",{headers:this.token.header()});
    }
    // Get one user profile
    getOne(name:string): Observable<ApiResponse<User | null>> {
        return this.http.get<ApiResponse<User | null>>(this.apiUrl + 'view/' + name);
    }
    // Following user by name by the user already logged in
    follow(name:string): Observable<ApiResponse<User | null>> {                 
        return this.http.put<ApiResponse<User | null>>(this.apiUrl + 'follow/' + name,{} ,{headers:this.token.header()}) 
    }
    // unFollow user by name  by the user already logged in
    unfollow(name:string): Observable<ApiResponse<User | null>> {        
        return this.http.put<ApiResponse<User | null>>(this.apiUrl + 'unfollow/' + name,{},{headers:this.token.header()});
    }
    update(user:FormData):Observable<ApiResponse<User|null>>{
        return this.http.put<ApiResponse<User | null>>(this.apiUrl + 'one' , user,{headers:this.token.header()});

    }

}