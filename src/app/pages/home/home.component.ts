import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CategoriesComponent } from '../../layouts/categories/categories.component';
import { RecipeManager } from '../../states/recipe.state';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { Recipe } from '../../models/recipe.model';
import { filter, map, take } from 'rxjs';
import { PaginationComponent } from "../../components/pagination/pagination.component";
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, CategoriesComponent, RecipeCardComponent, SpinnerComponent, PaginationComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {
  state$ = this.recipeManager.getState()
  currentPage = 1;
  recipe:Recipe[] = []
  newRecipe:Recipe[] = []



  constructor(private recipeManager: RecipeManager) {

  }

  ngOnInit() {  
    this.getRecipe()
  }

  getRecipe(){
    this.recipeManager.loadRecipes(this.currentPage)
  }
  onPageChange(page: number): void {  
    this.recipeManager.loadRecipes(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });  

  }


  // @HostListener('window:scroll', [])
  // onScroll() {
  //   if(window.innerHeight+window.scrollY + 50 >=document.body.offsetHeight ){
  //         if(this.currentPage<=this.totalPages){
  //           console.log(this.totalPages);
  //           this.currentPage++;
  //           this.getRecipe()
  //         }
      
  //         }


 
  // }
}