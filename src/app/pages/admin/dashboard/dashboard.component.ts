import { Component } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { RecipeManager } from '../../../states/recipe.state';
import { CategoryManager } from '../../../states/category.state';
import { UserManager } from '../../../states/user.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsideComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  recipe$ = this.recipeState.getState()
  category$ = this.categoryState.getState()
  user$ = this.userState.getState()

  constructor(private recipeState:RecipeManager,private categoryState:CategoryManager,private userState:UserManager) {
    this.userState.loadUsers()

  }

}
