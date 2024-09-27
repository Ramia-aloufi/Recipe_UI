import { createReducer, on, props } from '@ngrx/store';

import { Recipe } from '../../models/recipe.model';
import {
  filterRecipeByCategory,
  loadRecipe,
  loadRecipeFailure,
  loadRecipeSuccess,
  loadSingleRecipe,
  loadSingleRecipeFailure,
  loadSingleRecipeSuccess,
  searchRecipe,
} from './recipe.action';

export interface RecipeState {
  recipes: Recipe[];
  filteredRecipes:Recipe[]
  error: string | null;
  loading: boolean;
  singleRecipe: Recipe ;
}

export const initialState: RecipeState = {
  recipes: [],
  filteredRecipes:[],
  error: null,
  loading: false,
  singleRecipe: {} as Recipe,
};

export const recipeReducer = createReducer(
  initialState,
  on(loadRecipe, (state) => ({ ...state, loading: true })),
  on(loadRecipeSuccess, (state, { recipes }) => ({
    ...state,
    loading: false,
    recipes: recipes,
    filteredRecipes: recipes,
    error: null,
  })),
  on(loadRecipeFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(loadSingleRecipe, (state) => ({ ...state, loading: true })),
  on(loadSingleRecipeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(loadSingleRecipeSuccess, (state, { recipe }) => ({
    ...state,
    loading: false,
    singleRecipe: recipe,
    error: null
  })),
  on(searchRecipe, (state, { searchKey }) => ({
    ...state,
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchKey.toLowerCase())
    ),
    loading: false
  })),
  on(filterRecipeByCategory, (state, { category }) => ({
    ...state,
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.category?.name?.toLowerCase() == category?.toLowerCase()
    )
    
    }))
)
  
