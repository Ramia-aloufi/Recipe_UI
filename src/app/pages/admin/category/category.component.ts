import { Component } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryManager } from '../../../states/category.state';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [AsideComponent,CommonModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryState$ = this.state.getState()
  updatedCategory:Category  = {} as Category
  editingRow: number | null = null;
  editingCol: number | null = null;
  editing = false
  rowNum = 0
  newCategory=""
  isAddNewCategory = false
  constructor(private state:CategoryManager){
    this.state.loadCategory()
  }

  isEditing(row:number,category:Category) {
    this.rowNum = row
    this.updatedCategory = category
    return this.editing = !this.editing
  }
  saveCell() {
    this.editing = !this.editing
    this.state.updateCategory(this.updatedCategory)

  }
  onDelete(category:Category){
    this.state.deleteCategory(category)
  }
  onSave(){
    console.log(this.newCategory);
  }
  showInput(){
    if(this.isAddNewCategory && this.newCategory.length > 3){
      console.log(this.newCategory);
      this.state.addCategory(this.newCategory)
    }
    this.isAddNewCategory = !this.isAddNewCategory
    this.newCategory = ""

  }

}
