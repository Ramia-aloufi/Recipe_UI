import { createReducer, on } from '@ngrx/store';

import { loadCategory, loadCategoryFailure, loadCategorySuccess } from './category.action';
import { Category } from '../../models/category.model';

export interface CategoryState {
    categories: Category[];
    error: string | null;
    loading: boolean
}

export const initialState: CategoryState = {
    categories : [],
    error : null,
    loading : false
}

export const categoryReducer = createReducer(
    initialState,
    on(loadCategory,(state)=>({...state,loading:true})),
    on(loadCategorySuccess,(state , {categories})=>({...state,loading:false,categories:categories,error:null})),
    on(loadCategoryFailure,(state,{error})=>({...state,error:error,loading:false}))
)
