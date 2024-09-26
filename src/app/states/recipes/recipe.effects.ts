import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import * as RecipeActions from './recipe.action';
import { Recipe } from '../../models/recipe.model';

@Injectable()
export class RecipeEffects {
  loadRecipes$ = createEffect(() =>
    this.actions.pipe(
      ofType(RecipeActions.loadRecipe),
      mergeMap(() =>
        this.recipes.getRecipes().pipe(            
          map((response) => RecipeActions.loadRecipeSuccess({ recipes:response.data || [] })),
          catchError((error) => of(RecipeActions.loadRecipeFailure({ error: error.message })))
        )
      )
    )
  );
  singleRecipe$ = createEffect(()=>
    this.actions.pipe(
      ofType(RecipeActions.loadSingleRecipe),
      switchMap(({id}) =>
        this.recipes.getRecipeById(id).pipe(
          map((response) => RecipeActions.loadSingleRecipeSuccess({recipe:response.data || {} as Recipe})),
          catchError(error => of(RecipeActions.loadSingleRecipeFailure({ error })))
        )
      )
    )

  )

  constructor(
    private actions: Actions,
    private recipes: RecipeService
  ) {}
}
