import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { searchRecipes, selectAllRecipes } from '../../states/recipes/recipe.selectors';
import { Router } from '@angular/router';
import { CategoriesComponent } from '../../layouts/categories/categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public recipes$ = this.store.select(searchRecipes)

  constructor(private store:Store<AppState>,private router: Router){

  }

  onClick(id:string){
    this.router.navigate(['/recipe/' + id]);
  }

}
