import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import {BehaviorSubject, catchError, finalize, Observable, of, tap} from 'rxjs'

export interface IUser {
    user$: Observable<User | null>;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    getProfile():void;
    login(credentials: { email: string; password: string }): void;
    logout(): void;
  }
  
  export class UserManager implements IUser {
    private userSubject = new BehaviorSubject<User | null>(null);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);

      user$ = this.userSubject.asObservable()
      loading$ = this.loadingSubject.asObservable()
      error$= this.errorSubject.asObservable()

      constructor(private store:AuthService){}


      getProfile(): void {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);
        
        this.store.profile().subscribe({
            next: res => {
              this.userSubject.next(res.data); 
              this.loadingSubject.next(false); 
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
          },
          error: err => {
            this.errorSubject.next(err.message); 
            this.loadingSubject.next(false); 
          }
        })
      }
      logout(): void {
        sessionStorage.removeItem("token")

      }
  }