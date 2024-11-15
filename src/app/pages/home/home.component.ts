import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { RecipeManager } from '../../states/recipe.state';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { Recipe } from '../../models/recipe.model';
import { filter, map, take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategoriesComponent, RecipeCardComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {
  state$ = this.recipeManager.getState()
  currentPage = 1;
  totalPages =  0
  recipe:Recipe[] = []
  newRecipe:Recipe[] = []



  constructor(private recipeManager: RecipeManager) {
    this.state$.subscribe(state=>{
      this.totalPages = state.meta?.totalPages || 0
      console.log(this.totalPages);
    });  

  }

  ngOnInit() {  
    this.getRecipe()
  }

  getRecipe(){
    this.recipeManager.loadRecipes(this.currentPage)
  }


  @HostListener('window:scroll', [])
  onScroll() {
    if(window.innerHeight+window.scrollY + 50 >=document.body.offsetHeight ){
          if(this.currentPage<=this.totalPages){
            console.log(this.totalPages);
            this.currentPage++;
            this.getRecipe()
          }
      
          }


 
  }
}