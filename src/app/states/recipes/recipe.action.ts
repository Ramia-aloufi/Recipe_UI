import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';

export const loadRecipe = createAction('load recipe');
export const loadRecipeSuccess = createAction(
  'load recipe success',
  props<{ recipes: Recipe[] }>()
);
export const loadRecipeFailure = createAction(
  'load recipe failure',
  props<{ error: string }>()
);
export const loadSingleRecipe = createAction(
  'load single recipe',
  props<{ id: string }>()
);
export const loadSingleRecipeSuccess = createAction(
  'load single recipe success',
  props<{ recipe: Recipe }>()
);
export const loadSingleRecipeFailure = createAction(
  'load single recipe failure',
  props<{ error: string }>()
);



export const RecipeActions = createActionGroup({
  source: 'Recipe',
  events: {
    'Add Recipe': props<{ product: Recipe }>(),
    'Remove Recipe': props<{ productId: Recipe }>(),
    'Get Recipe': props<{ productId: string }>(),
    'Load Recipe': emptyProps,
  },
});

export const RecipeApiActions = createActionGroup({
  source: 'Recipe API',
  events: {
    'Load Products Success': props<{ products: Recipe[] }>(),
    'Load Products Failure': props<{ error: string }>(),
  },
});
