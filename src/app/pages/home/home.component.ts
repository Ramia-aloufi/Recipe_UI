import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { AuthService } from '../../services/auth.service';
import { RecipeManager } from '../../states/recipe.state';
import { Recipe } from '../../models/recipe.model';
import { FavoriteManager } from '../../states/favorite.state';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  state$ = this.recipeManager.getState()
  category$ = this.recipeManager.category$

  constructor(private router: Router,private authService: AuthService, private recipeManager:RecipeManager,private favoriteManager:FavoriteManager){

  }
  ngOnInit(): void {

  }

  onClick(id:string){
    this.router.navigate(['/recipe/' + id]);
  }
  addToFavorite(recipe:Recipe){

    this.favoriteManager.addFavorite(recipe._id)
  }
  isItemSaved$(itemId: string): Observable<boolean> {
    return this.state$.pipe(
      map(data => data.data?.some(item => item._id === itemId) ?? false)
    );
  }

}
