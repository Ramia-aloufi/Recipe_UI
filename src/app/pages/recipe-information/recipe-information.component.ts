import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeManager } from '../../states/recipe.state';
import { ProfileManager } from '../../states/profile.state';
import { AuthManager } from '../../states/auth.state';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { CommentManager } from '../../states/comment.state';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-recipe-information',
  standalone: true,
  imports: [RouterModule, CommonModule,SpinnerComponent,FormsModule],
  templateUrl: './recipe-information.component.html',
  styleUrl: './recipe-information.component.css',
})
export class RecipeInformationComponent implements OnInit {
  singleRecipe$ = this.recipeState.recipe$
  selectedSection: string = 'comments';
  auth$ = this.auth.getState()
  isExpand = false
  recipeID = ''
  commentText = ''
  user:string | undefined = ''

  constructor( private route: ActivatedRoute , private recipeState:RecipeManager,private profileManager:ProfileManager,private auth:AuthManager,private commentManager:CommentManager) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.recipeState.getRecipe(param['id'])
      this.recipeID = param['id']
    })
    this.auth.getState().subscribe(data=>{
      this.user = data.data?.username
    })

  }
  showSection(section: string) {
    this.selectedSection = section;
  }
  onFollow(name:string ){
    console.log(this.user);
    console.log(this.user);
    console.log(this.isFollowingChef());
    
    this.profileManager.follow(name)
  }
  onUnFollow(name:string){
    this.profileManager.unfollow(name)
  }
  toggleExpand(){
    this.isExpand = !this.isExpand
  }
  onAddComment(){
    if(this.commentText.trim() ){
    var data = {
      text:this.commentText,
      recipe:this.recipeID
    }
    console.log(data);

    this.commentManager.add(data)
    this.commentText = ''
  }else{
    console.log("add comment");
  }
    
  }
  onDeleteComment(id:string){
    this.commentManager.remove(id)
  }
  isFollowingChef(): boolean {
    return this.singleRecipe$.getValue()?.chef?.following?.some(follower => follower.username === this.user) ?? false;
}
}
