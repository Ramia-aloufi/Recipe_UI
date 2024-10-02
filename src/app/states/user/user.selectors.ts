import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "./user.reducer";

export const selectUser = (state: AppState) => state.user

export const selectUserData = createSelector(selectUser,(state: UserState) => state.user)
export const token = createSelector(selectUser,(state: UserState) => state.token)