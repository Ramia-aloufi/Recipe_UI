import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { StateService } from "../services/state.service";
import { HttpErrorResponse } from "@angular/common/http";
import { TokenManager } from "./token.state";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";


  @Injectable({
    providedIn: 'root' 
  })
  
  export class AuthManager extends StateService<User> {

      constructor(private store:AuthService,private userService:UserService,private token:TokenManager,private toastr: ToastrService,private route:Router){
        super();
      }
      
      signup(user:User) {
        this.setLoading(true)
        this.store.register(user).subscribe({
            next:res=>{
              if(res.data)
              this.setData(res.data)
              this.toastr.success(res.message.toString());
            },
            error: (err:HttpErrorResponse) => {
              this.setError(err.error.message) 
            }
        })
      }
      getProfile(): void {
        this.setLoading(true)
        var token = sessionStorage.getItem('token')     
        this.store.profile(token).subscribe({
            next: res => {              
              if(res.data)
                this.setData(res.data)
            },
            error: (err:HttpErrorResponse) => {
              this.setError(err.error.message) 
            }
          })
      }
      login(credentials: { email: string; password: string; }): void {
        this.setLoading(true)
          this.store.login(credentials).subscribe({
            next: res => {              
            if(res.data){
              this.token.set(res.data)
              this.toastr.success(res.message.toString());
            this.getProfile()
          }
          },
          error: (err:HttpErrorResponse) => {
            this.setError(err.error.message) 
            this.toastr.error(err.error.message.toString());
          }
        })
      }
      logout(): void {
        this.token.remove()
        this.setData(null)
        this.route.navigate(['/'])
      }
      isUser():boolean{
        return this.token.get() ? true : false
      }
      updateUser(user:FormData){
        this.setLoading(true)
        this.userService.update(user).subscribe({
            next:res=>{
              if(res.data)
              this.setData(res.data)
              this.toastr.success(res.message.toString());
            },
            error: (err:HttpErrorResponse) => {
              this.setError(err.error.message) 
            }
        })
      }

  }
  