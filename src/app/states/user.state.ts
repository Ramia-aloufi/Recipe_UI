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
    private allSubject = new BehaviorSubject<User[] | null>(null);
    private userSubject = new BehaviorSubject<User | null>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);

    all$ = this.allSubject.asObservable()
    user$ = this.userSubject.asObservable()
    loading$ = this.loadingSubject.asObservable()
    error$= this.errorSubject.asObservable()

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