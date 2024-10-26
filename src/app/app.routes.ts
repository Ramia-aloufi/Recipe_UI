import { Routes } from '@angular/router';
import { RecipeInformationComponent } from './pages/recipe-information/recipe-information.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { RecipeComponent } from './pages/admin/recipe/recipe.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';

export const routes: Routes = [
    {path:"recipe/:id",component:RecipeInformationComponent},
    {path:"",component:HomeComponent},
    {path:"auth",component:AuthComponent},
    {path:"profile",component:UserProfileComponent},
    {path: 'dashboard', component: DashboardComponent },
    {path: 'dashboard/category', component: CategoryComponent },
    {path: 'dashboard/recipe', component: RecipeComponent },
    {path: 'form', component: RecipeFormComponent },





    {path: '**', component: NotFoundComponent },

];
