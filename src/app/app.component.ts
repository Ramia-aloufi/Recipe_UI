import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { AuthManager } from './states/auth.state';
import { RecipeManager } from './states/recipe.state';
import { CategoryManager } from './states/category.state';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'recipe_UI';

  constructor( private auth:AuthManager,private recipe:RecipeManager,private category:CategoryManager){

  }

  ngOnInit() {
    if(this.auth.isUser()){
      this.auth.getProfile()
    } 
    this.recipe.loadRecipes(1)
    this.category.loadCategory()
  }
}
