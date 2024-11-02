import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { StateService } from "../services/state.service";
import { HttpErrorResponse } from "@angular/common/http";


  @Injectable({
    providedIn: 'root' 
  })
  
  export class AuthManager extends StateService<User> {

      constructor(private store:AuthService){
        super();
      }
      
      signup(user:User) {
        this.setLoading(true)
        this.store.register(user).subscribe({
            next:res=>{
              if(res.data)
              this.setData(res.data)
              this.setLoading(false)
            },
            error: (err:HttpErrorResponse) => {
              this.setError(err.error.message) 
              this.setLoading(false)
            }
        })
      }
      getProfile(): void {
        var token = sessionStorage.getItem('token')     
        this.store.profile(token).subscribe({
            next: res => {              
              if(res.data)
                this.setData(res.data)
                this.setLoading(false)
            },
            error: (err:HttpErrorResponse) => {
              this.setError(err.error.message) 
              this.setLoading(false)
            }
          })
      }
      login(credentials: { email: string; password: string; }): void {
        this.setLoading(true)
          this.store.login(credentials).subscribe({
            next: res => {              
            if(res.data){
            sessionStorage.setItem("token",res.data)
            this.getProfile()
            this.setLoading(false)


          }
          },
          error: (err:HttpErrorResponse) => {
            this.setError(err.error.message) 
            this.setLoading(false)
          }
        })
      }
      logout(): void {
        sessionStorage.removeItem("token")
        this.setData(null)
      }
      isUser():boolean{
        return sessionStorage.getItem('token') ? true : false
      }

  }
  