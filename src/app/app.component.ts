import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { AuthManager } from './states/auth.state';
import { FavoriteManager } from './states/favorite.state';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'recipe_UI';

  constructor( private um:AuthManager ,private favorite:FavoriteManager){

  }

  ngOnInit() {
    if(this.um.isUser()){
      this.um.getProfile()
      // this.favorite.getFavorite()

    } 
  }
}
