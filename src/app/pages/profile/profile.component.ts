import { Component } from '@angular/core';
import { AuthManager } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, SpinnerComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData$ = this.state.getState()

  constructor(private state:AuthManager) {
    
  }
  onLogout() {
    this.state.logout();
  }
}
