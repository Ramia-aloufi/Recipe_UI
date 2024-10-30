import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import {BehaviorSubject,Observable} from 'rxjs'

export interface IUser {
    user$: Observable<User | null>;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    getProfile():void;
    login(credentials: { email: string; password: string }): void;
    logout(): void;
    signup(user:User):void
    checkLoginStatus():void
  }
  @Injectable({
    providedIn: 'root' // Automatically provided at the root level
  })
  
  export class UserManager implements IUser {
    private userSubject = new BehaviorSubject<User | null>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);
    private isLoggedIn = new BehaviorSubject<boolean>(false);

      user$ = this.userSubject.asObservable()
      loading$ = this.loadingSubject.asObservable()
      error$= this.errorSubject.asObservable()

      constructor(private store:AuthService){}
      
      signup(user:User): void {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);
        this.store.register(user).subscribe({
            next:res=>{
                this.userSubject.next(res.data || null)
            },
            error:err=>{
                this.errorSubject.next(err.message); 
                this.loadingSubject.next(false); 
            }
        })
      }
      getProfile(): void {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);
        
        this.store.profile().subscribe({
            next: res => {
              this.userSubject.next(res.data); 
              this.loadingSubject.next(false); 
              this.isLoggedIn.next(true);
            },
            error: err => {
              this.errorSubject.next(err.message); 
              this.loadingSubject.next(false); 
            }
          })
      }
      login(credentials: { email: string; password: string; }): void {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);
          this.store.login(credentials).subscribe({
            next: res => {
            if(res.data)
            sessionStorage.setItem("token",res.data)
            this.loadingSubject.next(false); 
            this.checkLoginStatus()
            this.getProfile()
          },
          error: err => {
            this.errorSubject.next(err.message); 
            this.loadingSubject.next(false); 
          }
        })
      }
      logout(): void {
        sessionStorage.removeItem("token")
        this.userSubject.next(null)
        this.isLoggedIn.next(false);


      }
      checkLoginStatus() {
        const token = sessionStorage.getItem('token');
        if (token) {
          this.getProfile() 
        } else {
          this.userSubject.next(null) 
        }
      }
      isUser():boolean{
        return this.isLoggedIn.getValue()
      }
      isAdmin():boolean{
        var isAdmin = false
        if(this.isLoggedIn){
          this.store.admin().subscribe({
            next: res => {
            if(res.data)
              isAdmin = res.data
          },
          error: err => {
            isAdmin = false
          }
        })
        }
        return isAdmin
      }
  }
  