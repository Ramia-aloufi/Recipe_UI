import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchRecipe } from '../../states/recipes/recipe.action';
import { AppState } from '../../states/app.state';
import { selectUserData } from '../../states/user/user.selectors';
import { CommonModule } from '@angular/common';
import { logout } from '../../states/user/user.action';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false
  userData$ = this.store.select(selectUserData) 

  constructor( private store:Store<AppState>) {
   }



  onSearch(searchKey: Event) {
    const target = searchKey.target as HTMLInputElement
    if (target) {
      console.log(target.value);
      this.store.dispatch(searchRecipe({ searchKey: target.value }));
    }
  }
  onLogout(){
    this.store.dispatch(logout())
  }


  

  
  


}
