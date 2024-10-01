import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
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
          map((response) => UserActions.loginSuccess({ user:response.data || null })),
          catchError((error) => of(UserActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private service: AuthService
  ) {}
}
