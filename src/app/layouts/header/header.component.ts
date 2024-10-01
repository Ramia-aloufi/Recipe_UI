import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchRecipe } from '../../states/recipes/recipe.action';
import { AppState } from '../../states/app.state';
import { selectUserData } from '../../states/user/user.selectors';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false

  constructor( private store:Store<AppState>) {
    this.store.select(selectUserData).subscribe(user => {
    }); 
   }



  onSearch(searchKey: Event) {
    const target = searchKey.target as HTMLInputElement
    if (target) {
      console.log(target.value);
      this.store.dispatch(searchRecipe({ searchKey: target.value }));
    }
  }


  

  
  


}
