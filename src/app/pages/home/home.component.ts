import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { AuthService } from '../../services/auth.service';
import { RecipeManager } from '../../states/recipe.state';

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

  constructor(private router: Router,private authService: AuthService, private recipeManager:RecipeManager){

  }
  ngOnInit(): void {

  }

  onClick(id:string){
    this.router.navigate(['/recipe/' + id]);
  }

}
