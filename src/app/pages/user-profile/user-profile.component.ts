import { Component } from '@angular/core';
import { AuthManager } from '../../states/auth.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userData$ = this.userManager.getState()

  constructor(private userManager: AuthManager){}
}
