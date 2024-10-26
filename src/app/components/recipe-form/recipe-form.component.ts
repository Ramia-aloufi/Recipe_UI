import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryManager } from '../../states/category.state';
import { CommonModule } from '@angular/common';
import { RecipeManager } from '../../states/recipe.state';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  categoryState$ = this.state.getState()
  isSubmitted = false
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder ,private state :CategoryManager,private recipe:RecipeManager) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      preparationTime: [0, [Validators.required, Validators.min(1)]],
      cookingTime: [0, [Validators.required, Validators.min(1)]],
      servings: [1, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('')]),
      steps: this.fb.array([this.fb.control('')]),
      media: this.fb.array([this.fb.control('')]),

    });
  }
  get media(): FormArray {
    return this.recipeForm.get('media') as FormArray;
  }
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }


  add(array: FormArray) {
    array.push(this.fb.control(''));
  }
  remove(array: FormArray, index: number) {
    array.removeAt(index);
  }

  ngOnInit() {}

  onSubmit() {
    this.isSubmitted = true
    if ( this.isSubmitted && this.recipeForm.valid) {
      this.recipe.addRecipe(this.recipeForm.value)
      console.log(this.recipeForm.value);
    }
    console.log("notValid\n" +this.recipeForm.errors);

  }
  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    console.log(file);
    
    if (file) {
      this.media.at(index).setValue(file); 
    }
  }
  
  getErrorMessage(field: string): string {
    const control = this.recipeForm.get(field);
    if (this.isSubmitted) {
      const errors = control?.errors;
      if (errors?.['required']) return `${field} is required`;
      if (errors?.['minlength'])
        return `${field} must be at least ${errors?.['minlength'].requiredLength} characters long`;
    }
    return '';
  }
}
