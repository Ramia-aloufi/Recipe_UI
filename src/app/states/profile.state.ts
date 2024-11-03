import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { StateService } from "../services/state.service";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root',
  })
  export class ProfileManager extends StateService<User> {

    constructor(private service: UserService) {
        super();
      }
    

    getOne(name:string){
      this.setLoading(true)
      this.service.getOne(name).subscribe({
        next:res=>{   
            this.setData(res.data)
            this.setLoading(false)
          },error: (err:HttpErrorResponse) => {
            this.setError(err.error.message) 
            this.setLoading(false)
          }
    })
    }
    follow(name:string){
        
        this.setLoading(true)
        this.service.follow(name).subscribe({
          next:res=>{   
              this.setData(res.data)
              this.setLoading(false)
            },error: (err:HttpErrorResponse) => {
              this.setError(err.error.message) 
              this.setLoading(false)
            }
      })
    }
    unfollow(name:string){
        this.setLoading(true)
        this.service.unfollow(name).subscribe({
          next:res=>{   
              this.setData(res.data)
              this.setLoading(false)
            },error: (err:HttpErrorResponse) => {
              this.setError(err.error.message) 
              this.setLoading(false)
            }
      })
    }


  }