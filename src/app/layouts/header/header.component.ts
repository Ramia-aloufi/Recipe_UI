import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { searchRecipe } from '../../states/recipes/recipe.action';
import { CommonModule } from '@angular/common';
import { UserManager } from '../../states/user/user.state';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';

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
    private store: Store<AppState>
  ) {}

  onSearch(searchKey: Event) {
    const target = searchKey.target as HTMLInputElement;
    if (target) {
      this.store.dispatch(searchRecipe({ searchKey: target.value }));
    }
  }
  onLogout() {
    this.userManager.logout();
    this.userManager.getProfile()
  }
}
