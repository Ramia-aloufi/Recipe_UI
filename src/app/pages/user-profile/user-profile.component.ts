import { Component } from '@angular/core';
import { AuthManager } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { UserManager } from '../../states/user.state';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { ProfileManager } from '../../states/profile.state';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { User } from '../../models/user.model';

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
  follower: User[]  | undefined = []
  user : string | undefined = ""

  constructor(private profileManager: ProfileManager, private route: ActivatedRoute,private auth:AuthManager){}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.profileManager.getOne(param['name'])
      this.userData$.subscribe(data=>{
        this.follower = data.data?.following
      })
      this.auth$.subscribe(data=>{
        this.user = data.data?.username
      })
    })
}
onFollow(name:string){
  this.profileManager.follow(name)
}

isFollower():boolean{
return this.follower?.some(follower=>follower.username  == this.user ) ?? false
}

}
