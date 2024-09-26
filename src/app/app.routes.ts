import { Routes } from '@angular/router';
import { RecipeInformationComponent } from './pages/recipe-information/recipe-information.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path:"recipe/:id",component:RecipeInformationComponent},
    {path:"",component:HomeComponent}

];
