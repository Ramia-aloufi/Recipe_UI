import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeManager } from '../../states/recipe.state';
import { ProfileManager } from '../../states/profile.state';
import { AuthManager } from '../../states/auth.state';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { CommentManager } from '../../states/comment.state';
import { Recipe } from '../../models/recipe.model';
import { FavoriteManager } from '../../states/favorite.state';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { ToastrService } from 'ngx-toastr';
import { IComment } from '../../models/comment.model';

@Component({
    selector: 'app-recipe-information',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        SpinnerComponent,
        FormsModule,
        RecipeFormComponent,
    ],
    templateUrl: './recipe-information.component.html',
    styleUrl: './recipe-information.component.css'
})
export class RecipeInformationComponent implements OnInit {
  singleRecipe$ = this.recipeState.recipe$;
  selectedSection: string = 'comments';
  auth$ = this.auth.getState();
  isExpand = false;
  isEdit = false;
  recipeID = '';
  commentText = '';
  user: string | undefined = '';
  recipeFavorite$ = this.favoriteManager.getState();
  favorite = false;
  isSharePopup = false;
  pageUrl: string = window.location.href;
  constructor(
    private route: ActivatedRoute,
    private recipeState: RecipeManager,
    private profileManager: ProfileManager,
    private auth: AuthManager,
    private commentManager: CommentManager,
    private favoriteManager: FavoriteManager,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRecipe();
    this.auth$.subscribe((state) => {
      this.user = state.data?.username;
    });
  }
  fetchRecipe(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.recipeID = recipeId;
      this.recipeState.recipeID$.next(recipeId);
      this.recipeState.getRecipe(recipeId);
    }
  }
  showSection(section: string) {
    this.selectedSection = section;
  }
  onFollow(name: string,) {
    this.profileManager.follow(name,this.recipeID);
    
  }

  toggleExpand() {
    this.isExpand = !this.isExpand;
  }
  onAddComment() {
    if (this.commentText.trim()) {
      var data = {
        text: this.commentText,
        recipe: this.recipeID,
      };
      this.commentManager.add(data);
      this.commentText = '';
    } else {
      this.toastr.error('Comment cannot be empty');
    }
  }
  onDeleteComment(comment: IComment) {
    this.commentManager.remove(comment);
  }
  isFollowingChef(): boolean {
    return (
      this.singleRecipe$
        .getValue()
        ?.chef?.following?.some(
          (follower) => follower.username === this.user
        ) ?? false
    );
  }
  toggleFavorite(recipe: Recipe) {
    if(!sessionStorage.getItem('token') ){
      this.router.navigate(['/auth'])
    }
    this.favoriteManager.addFavorite(recipe._id);
    this.auth
    this.auth.getProfile();
  }
  isFavorite(recipeId: string): boolean {
    this.auth.getState().subscribe((state) => {
      this.favorite =
        state.data?.favorite?.some((fav) => fav?._id === recipeId) ??
        false;
    });
    return this.favorite;
  }
  onSharePopup() {
    this.isSharePopup = !this.isSharePopup;
  }
  copyLink() {
    navigator.clipboard.writeText(this.pageUrl).then(() => {
      alert('Link copied to clipboard!');
    });
  }
  shareOnFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.pageUrl
      )}`,
      '_blank'
    );
  }
  shareOnTwitter() {
    window.open(
      `https://x.com/share?url=${encodeURIComponent(this.pageUrl)}`,
      '_blank'
    );
  }
  isCurrentUser(username: string): boolean {
    let isCurrentUser = false;
    this.auth$.subscribe((state) => {
      isCurrentUser = state.data?.username === username;
    });
    return isCurrentUser;
  }
  onUpdateRecipe(recipe: Recipe) {
    this.isEdit = true;
    this.recipeState.setRecipe(recipe);
  }
  onDeleteRecipe(recipe: Recipe) {
    const confirmed = confirm('Are you sure you want to delete this recipe?');
    if (confirmed) {
      this.recipeState.deleteRecipe(recipe);

      this.toastr.success('Recipe deleted successfully');
      this.router.navigate(['/']);
    }
  }
  toggleModal(fetchRecipe: boolean = false) {
    this.isEdit = false;
    this.recipeState.clearRecipe();
    if (!this.isEdit && fetchRecipe) {
      this.fetchRecipe();
    }
  }
}
