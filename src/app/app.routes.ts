import { Routes } from '@angular/router';
import { RecipeInformationComponent } from './pages/recipe-information/recipe-information.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path:"recipe/:id",component:RecipeInformationComponent},
    {path:"",component:HomeComponent},
    {path:"auth",component:AuthComponent},
    {path:"profile",component:UserProfileComponent},
    {path: '**', component: NotFoundComponent }
];
