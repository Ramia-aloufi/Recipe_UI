import { Component } from '@angular/core';
import { AuthManager } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { UserManager } from '../../states/user.state';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { ProfileManager } from '../../states/profile.state';
import { SpinnerComponent } from "../../components/spinner/spinner.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, RouterModule, SpinnerComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userData$ = this.profileManager.getState()
  auth$ = this.auth.getState()

  constructor(private profileManager: ProfileManager, private route: ActivatedRoute,private auth:AuthManager){}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.profileManager.getOne(param['name'])
    })
}
onFollow(name:string){
  console.log(name);

  this.profileManager.follow(name)
}
onUnFollow(name:string){
  
  this.profileManager.unfollow(name)
}
}
