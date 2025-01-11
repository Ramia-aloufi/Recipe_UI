import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { RecipeManager } from '../../../states/recipe.state';
import { CategoryManager } from '../../../states/category.state';
import { UserManager } from '../../../states/user.state';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [AsideComponent, CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit  {
  recipe$ = this.recipeState.getState()
  category$ = this.categoryState.getState()
  user$ = this.userState.getState()
  lastSegment: string = '';

  constructor(private recipeState:RecipeManager,private categoryState:CategoryManager,private userState:UserManager,private route:ActivatedRoute) {
    this.userState.loadUsers()
    this.recipeState.loadRecipes()
    this.categoryState.loadCategory()


  }
  ngOnInit(): void {
    const segments = this.route.snapshot.url;
    this.lastSegment = segments[segments.length - 1]?.path || '';
  }

}
