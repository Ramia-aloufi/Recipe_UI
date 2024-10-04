import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.action';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Injectable()
export class UserEffects {
  signup$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.signup),
      mergeMap(({user}) =>
        this.service.register(user).pipe(            
          map((response) => UserActions.signupSuccess({ user:response.data || {} as User })),
          catchError((error) => of(UserActions.signupFailure({ error: error.message })))
        )
      )
    )
  );
  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.login),
      mergeMap(({user}) =>
        this.service.login(user).pipe(            
          map((response) => UserActions.loginSuccess({ token:response.data || null })),
          catchError((error) => of(UserActions.loginFailure({ error: error.message })))
        )
      )
    )
  );
  loginSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.loginSuccess), 
      tap(({ token }) => {
        if(token)
          sessionStorage.setItem('token', token);
      })
    ),
    { dispatch: false } 
  );
  profile$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.userProfile),
      mergeMap(() =>
        this.service.profile().pipe(            
          map((response) => UserActions.userProfileSuccess({ user:response.data || null })),
          catchError((error) => of(UserActions.userProfileFailure({ error: error.message })))
        )
      )
    )
  );
  logout$ = createEffect(() =>
    this.actions.pipe(
      ofType(UserActions.logout), 
      tap(() => {
        sessionStorage.removeItem('token');
      })    )
  );


  constructor(
    private actions: Actions,
    private service: AuthService
  ) {}
}
