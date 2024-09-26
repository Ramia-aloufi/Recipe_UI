import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category.model';

export const loadCategory = createAction('load category')

export const loadCategorySuccess = createAction('load category success',
    props<{ categories: Category[] }>()
)
export const loadCategoryFailure = createAction('load category failure',
    props<{ error: string }>()

)