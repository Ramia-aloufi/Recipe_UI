import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeManager } from '../../states/recipe.state';
import { ProfileManager } from '../../states/profile.state';
import { AuthManager } from '../../states/auth.state';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { CommentManager } from '../../states/comment.state';
import { Recipe } from '../../models/recipe.model';
import { FavoriteManager } from '../../states/favorite.state';

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
  recipeFavorite$ = this.favoriteManager.getState()
  favorite = false;
  isSharePopup = false;
  pageUrl: string = window.location.href;
  constructor( private route: ActivatedRoute , private recipeState:RecipeManager,private profileManager:ProfileManager,private auth:AuthManager,private commentManager:CommentManager,private favoriteManager:FavoriteManager) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.recipeState.getRecipe(param['id'])
      this.recipeID = param['id']
      this.recipeState.recipeID$.next(this.recipeID)
    })
    this.auth.getState().subscribe(data=>{
      this.user = data.data?.username
    })

  }
  showSection(section: string) {
    this.selectedSection = section;
  }
  onFollow(name:string ){
    
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
addToFavorite(recipe:Recipe){
  this.favoriteManager.addFavorite(recipe._id)
  this.auth.getProfile()
}
removeFavorite(recipe:Recipe){
  var id :string|undefined= undefined
  this.recipeFavorite$.subscribe(data => {
    if(data.data)
     id = data.data?.find(fav => fav?.recipe?._id === recipe._id)?._id   
  })
  this.favoriteManager.deleteFavorite(id)
}
isFavorite(recipeId: string): boolean {
  this.auth.getState().subscribe(state=>{
      this.favorite = state.data?.favorite?.some(fav => fav?.recipe?._id === recipeId) ?? false;
    })
    return this.favorite 
  }
  onSharePopup() {
    this.isSharePopup = !this.isSharePopup;
  }



  copyLink() {
    navigator.clipboard.writeText(this.pageUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  }

  shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.pageUrl)}`, '_blank');
  }

  shareOnTwitter() {
    window.open(`https://x.com/share?url=${encodeURIComponent(this.pageUrl)}`, '_blank');
  }
}
