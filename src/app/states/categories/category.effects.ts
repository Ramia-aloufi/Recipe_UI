import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadCategory, loadCategoryFailure, loadCategorySuccess } from './category.action';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
  loadRecipe$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadCategory),
      mergeMap(() =>
        this.categories.getCategories().pipe(            
          map((response) => loadCategorySuccess({ categories:response.data || [] })),
          catchError((error) => of(loadCategoryFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private categories: CategoryService
  ) {}
}
