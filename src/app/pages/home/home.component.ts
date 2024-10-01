import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { searchRecipes, selectAllRecipes } from '../../states/recipes/recipe.selectors';
import { Router } from '@angular/router';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public recipes$ = this.store.select(searchRecipes)

  constructor(private store:Store<AppState>,private router: Router,private authService: AuthService){

  }
  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      // Optionally set token in a state management tool like NgRx
      console.log('Token from cookie:', token);
    }
  }

  onClick(id:string){
    this.router.navigate(['/recipe/' + id]);
  }

}
