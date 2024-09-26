import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CategoryState } from "./category.reducer";

export const selectCategories = (state: AppState) => state.categories

export const selectAllCategories = createSelector(selectCategories,(state: CategoryState) => state.categories)