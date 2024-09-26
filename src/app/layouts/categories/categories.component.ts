import { Component, OnInit } from '@angular/core';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../../states/categories/category.selectors';
import { loadCategory } from '../../states/categories/category.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent   {
  public categories$ = this.store.select(selectAllCategories)

  constructor(private store:Store<AppState>){}


}
