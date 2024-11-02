import { Routes } from '@angular/router';
import { RecipeInformationComponent } from './pages/recipe-information/recipe-information.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { RecipeComponent } from './pages/admin/recipe/recipe.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/admin/user/user.component';

export const routes: Routes = [

    {path:"recipe/:id",component:RecipeInformationComponent},
    {path:"",component:HomeComponent},
    {path:"auth",component:AuthComponent},
    //LoginUser
    {path:"profile",component:ProfileComponent,canActivate: [authGuard] },
    {path: 'favorite', component: FavoritesComponent ,canActivate: [authGuard]},
     //ADMIN
    {path: 'dashboard', component: DashboardComponent,canActivate: [adminGuard] },
    {path: 'dashboard/category', component: CategoryComponent,canActivate: [adminGuard] },
    {path: 'dashboard/recipe', component: RecipeComponent,canActivate: [adminGuard] },
    {path: 'dashboard/user', component: UserComponent,canActivate: [adminGuard] },


    {path: '**', component: NotFoundComponent },

];
