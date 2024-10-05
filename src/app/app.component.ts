import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadRecipe } from './states/recipes/recipe.action';
import { AppState } from './states/app.state';
import { selectAllRecipes } from './states/recipes/recipe.selectors';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './layouts/categories/categories.component';
import { HeaderComponent } from './layouts/header/header.component';
import { loadCategory } from './states/categories/category.action';
import { HomeComponent } from './pages/home/home.component';
import { userProfile } from './states/user/user.action';
import { UserManager } from './states/user/user.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,CategoriesComponent,HeaderComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'recipe_UI';

  constructor(private store:Store<AppState>, private um:UserManager){

  }

  ngOnInit() {
    this.store.dispatch(loadRecipe())
    this.store.dispatch(loadCategory())
    this.um.checkLoginStatus()
    
  }
}
