import { Component } from '@angular/core';
import { AuthManager } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { UserManager } from '../../states/user.state';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,RecipeCardComponent,RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userData$ = this.userManager.user$

  constructor(private userManager: UserManager, private route: ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.userManager.getOne(param['name'])
    })
}
}
