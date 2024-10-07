import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserManager } from '../../states/user.state';
import { Store } from '@ngrx/store';
import { RecipeManager } from '../../states/recipe.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userData$ = this.userManager.user$;

  constructor(
    private userManager: UserManager,
    private recipeState: RecipeManager
  ) {}

  onSearch(searchKey: Event) {
    const target = searchKey.target as HTMLInputElement;
    if (target) {
      this.recipeState.search(target.value);
    }
  }
  onLogout() {
    this.userManager.logout();
  }
}
