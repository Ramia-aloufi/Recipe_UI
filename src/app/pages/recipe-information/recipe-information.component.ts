import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeManager } from '../../states/recipe.state';
import { UserManager } from '../../states/user.state';
import { ProfileManager } from '../../states/profile.state';
import { AuthManager } from '../../states/auth.state';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-recipe-information',
  standalone: true,
  imports: [RouterModule, CommonModule,SpinnerComponent],
  templateUrl: './recipe-information.component.html',
  styleUrl: './recipe-information.component.css',
})
export class RecipeInformationComponent implements OnInit {
  singleRecipe$ = this.recipeState.recipe$
  selectedSection: string = 'ingredients';
  auth$ = this.auth.getState()
  isExpand = false

  constructor( private route: ActivatedRoute , private recipeState:RecipeManager,private profileManager:ProfileManager,private auth:AuthManager) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.recipeState.getRecipe(param['id'])
    })
    this.auth.getState()

  }
  showSection(section: string) {
    this.selectedSection = section;
  }
  onFollow(name:string){
    this.profileManager.follow(name)
  }
  onUnFollow(name:string){
    this.profileManager.unfollow(name)
  }
  toggleExpand(){
    this.isExpand = !this.isExpand
  }
}
