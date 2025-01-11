import { Component } from '@angular/core';
import { AuthManager } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [CommonModule, RouterModule, RecipeCardComponent],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  userData$ = this.user.getState()
constructor(private user :AuthManager){}
}
