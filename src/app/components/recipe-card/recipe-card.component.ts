import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { AuthManager } from '../../states/auth.state';
import { ProfileManager } from '../../states/profile.state';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  user$ = this.user.getState();
  favorite = false;
  @Input() recipe!: Recipe;
  constructor(
    private router: Router,
    private profile: ProfileManager,
    private user: AuthManager
  ) {}
  onClick(id: string) {
    this.router.navigate(['/recipe/' + id]);
  }
  toggleFavorite(recipe: Recipe) {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/auth']);
    }
    var form = new FormData();
    form.append('favorite', recipe._id);
    this.user.updateUser(form) }
  isFavorite(recipeId: string): boolean {
    this.user.getState().subscribe((state) => {
      this.favorite =
        state.data?.favorite?.some((fav) => fav._id === recipeId) ?? false;
    });
    return this.favorite;
  }
}
