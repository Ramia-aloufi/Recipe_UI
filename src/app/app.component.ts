import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './layouts/categories/categories.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { UserManager } from './states/user.state';
import { CategoryManager } from './states/category.state';
import { RecipeManager } from './states/recipe.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,CategoriesComponent,HeaderComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'recipe_UI';

  constructor( private um:UserManager ,private categoryState:CategoryManager,private recipeManager:RecipeManager ){

  }

  ngOnInit() {
    this.recipeManager.loadRecipes()
    this.categoryState.loadCategory()   
    if(this.um.isUser()){
      this.um.getProfile()
    } 
  }
}
