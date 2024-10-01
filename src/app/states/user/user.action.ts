import {
  createAction,
  props,
} from '@ngrx/store';
import { User } from '../../models/user.model';

export const signup = createAction('signup', props<{ user: User }>());
export const signupSuccess = createAction(
  'signup success',
  props<{ user: User }>()
);
export const signupFailure = createAction(
  'signup failure',
  props<{ error: string }>()
);
export const login = createAction('login', props<{ user: {email:string,password:string} }>());
export const loginSuccess = createAction(
  'login success',
  props<{ user: string | null }>()
);
export const loginFailure = createAction(
  'login failure',
  props<{ error: string }>()
);
