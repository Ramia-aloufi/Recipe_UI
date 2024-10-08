import { Component } from '@angular/core';
import { UserManager } from '../../states/user.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userData$ = this.userManager.user$;

  constructor(private userManager: UserManager){}
}
