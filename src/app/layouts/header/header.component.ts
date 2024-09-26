import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchRecipe } from '../../states/recipes/recipe.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private store: Store) {}
  onSearch(searchKey: Event) {
    const target = searchKey.target as HTMLInputElement
    if (target) {
      console.log(target.value);
      this.store.dispatch(searchRecipe({ searchKey: target.value }));
    }
  }
}
