import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {  provideEffects } from '@ngrx/effects';
import { recipeReducer } from './states/recipes/recipe.reducer';
import { RecipeEffects } from './states/recipes/recipe.effects';
import { provideHttpClient } from '@angular/common/http';
import { CategoryEffects } from './states/categories/category.effects';
import { categoryReducer } from './states/categories/category.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideStore({ recipes: recipeReducer,categories:categoryReducer }),
    provideEffects([RecipeEffects,CategoryEffects]),
    provideHttpClient()  ]
};
