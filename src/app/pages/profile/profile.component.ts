import { Component } from '@angular/core';
import { UserManager } from '../../states/user.state';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RecipeCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData$ = this.state.user$

  constructor(private state:UserManager) {
    
  }
  onLogout() {
    this.state.logout();
  }
}
