import { Component, OnInit } from '@angular/core';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { loadSingleRecipe } from '../../states/recipes/recipe.action';
import { selectRecipes, selectSingleRecipes } from '../../states/recipes/recipe.selectors';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-information',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './recipe-information.component.html',
  styleUrl: './recipe-information.component.css',
})
export class RecipeInformationComponent implements OnInit {
  singleRecipe$ = this.store.select(selectSingleRecipes)
  selectedSection: string = 'ingredients';

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.store.dispatch(loadSingleRecipe({id: param['id']} ));
    })
    

  }
  showSection(section: string) {
    this.selectedSection = section;
  }
}
