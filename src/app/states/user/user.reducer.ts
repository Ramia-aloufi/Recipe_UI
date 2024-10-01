import { createReducer, on } from '@ngrx/store';

import {
  login,
  loginFailure,
  loginSuccess,
  signup,
  signupFailure,
  signupSuccess,
} from './user.action';
import { User } from '../../models/user.model';

export interface UserState {
  user:User;
  error: string | null;
  loading: boolean;
  token:string | null
}

export const initialState: UserState = {
  error: null,
  loading: false,
  user: {} as User,
  token:null
};

export const userReducer = createReducer(
  initialState,

  on(signup, (state) => ({ ...state, loading: true })),
  on(signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(signupSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user: user,
    error: null
  })),
  on(login, (state) => ({ ...state, loading: true })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    token: user,
    error: null
  })),

)
  
