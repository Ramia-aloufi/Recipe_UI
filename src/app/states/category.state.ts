import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryManager extends StateService<Category[]> {
  category$: BehaviorSubject<Category | null> =
    new BehaviorSubject<Category | null>(null);

  constructor(private service: CategoryService) {
    super();
  }

  loadCategory() {
    this.setLoading(true);
    this.service.getCategories().subscribe({
      next: (res) => {
        this.setData(res.data);
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }
  updateCategory(category: Category) {
    this.setLoading(true);
    this.service.updateCategory(category).subscribe({
      next: (_) => {
        this.loadCategory();
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }
  deleteCategory(category: Category) {
    this.setLoading(true);
    this.service.deleteCategory(category._id).subscribe({
      next: (_) => {
        this.loadCategory();
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }
  getCategory(id: string) {
    this.setLoading(true);
    this.service.getCategoryById(id).subscribe({
      next: (res) => {
        this.category$.next(res.data);
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }
  addCategory(category: string) {
    this.setLoading(true);
    this.service.addCategory(category).subscribe({
      next: (_) => {
        this.loadCategory();
      },
      error: (err) => {
        this.setError(err.error.message);
      },
    });
    this.setLoading(false);
  }
}
