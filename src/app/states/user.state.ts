import { Injectable } from "@angular/core";
import { User, UserAdmin } from "../models/user.model";
import { StateService } from "../services/state.service";
import { BehaviorSubject } from "rxjs";
import { UserService } from "../services/user.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
  export class UserManager extends StateService<UserAdmin[]> {
    private userSubject = new BehaviorSubject<User | null>(null);
    user$ = this.userSubject.asObservable()

    constructor(private service: UserService) {
        super();
      }
    
    loadUsers(){
        this.setLoading(true)
        this.service.getAll().subscribe({
            next:res=>{              
                this.setData(res.data)
                this.setLoading(false)
              },
              error: (err:HttpErrorResponse) => {
                this.setError(err.error.message) 
                this.setLoading(false)
              }
        })
    }


  }