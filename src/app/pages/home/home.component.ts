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
import { UserManager } from '../../states/user.state';
import { User } from '../../models/user.model';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CategoriesComponent, RecipeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  state$ = this.recipeManager.getState()

  constructor(private recipeManager:RecipeManager){

  }


  }


