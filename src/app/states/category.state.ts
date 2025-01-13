import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { StateService } from '../services/state.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryManager extends StateService<Category[]> {
  category$: BehaviorSubject<Category | null> =
    new BehaviorSubject<Category | null>(null);

  constructor(private service: CategoryService) {
    super();
  }

  loadCategory( page:number = 1) {
    this.setLoading(true);
    this.service.getCategories(page).subscribe({
      next: (res) => {
        this.setData(res.data);
        this.setMeta(res.meta);
      },
      error: (err:HttpErrorResponse) => {
        this.setError(err.error.message) 
      }
    });
  }
  updateCategory(category: Category) {
    this.setLoading(true);
    this.service.updateCategory(category).subscribe({
      next: (_) => {
        this.loadCategory();
      },
      error: (err:HttpErrorResponse) => {
        this.setError(err.error.message) 
      }
    });
  }
  deleteCategory(category: Category) {
    this.setLoading(true);
    this.service.deleteCategory(category._id).subscribe({
      next: (_) => {
        this.loadCategory();
      },
      error: (err:HttpErrorResponse) => {
        this.setError(err.error.message) 
      }
    });
  }
  getCategory(id: string) {
    this.setLoading(true);
    this.service.getCategoryById(id).subscribe({
      next: (res) => {
        this.category$.next(res.data);
      },
      error: (err:HttpErrorResponse) => {
        this.setError(err.error.message) 
      }
    });
  }
  addCategory(category: string) {
    this.setLoading(true);
    this.service.addCategory(category).subscribe({
      next: (_) => {
        this.loadCategory();
      },
      error: (err:HttpErrorResponse) => {
        this.setError(err.error.message) 
      }
    });
  }
}
