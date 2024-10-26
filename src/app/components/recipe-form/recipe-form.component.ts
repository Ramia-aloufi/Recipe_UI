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
   formData = new FormData();

  constructor(private fb: FormBuilder ,private state :CategoryManager,private recipe:RecipeManager) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      preparationTime: [0, [Validators.required, Validators.min(1)]],
      cookingTime: [0, [Validators.required, Validators.min(1)]],
      servings: [1, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('')]),
      steps: this.fb.array([this.fb.control('')]),
      media: this.fb.array([this.fb.control(File)]),

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

      var formData = new FormData();

      // Append form fields
      formData.append('title', this.recipeForm.get('title')?.value);
      formData.append('preparationTime', this.recipeForm.get('preparationTime')?.value);
      formData.append('cookingTime', this.recipeForm.get('cookingTime')?.value);
      formData.append('servings', this.recipeForm.get('servings')?.value);
      formData.append('category', this.recipeForm.get('category')?.value);

      // Append ingredients and steps arrays
      this.ingredients.controls.forEach((control, index) => {
        formData.append(`ingredients[${index}]`, control.value);
      });

      this.steps.controls.forEach((control, index) => {
        formData.append(`steps[${index}]`, control.value);
      });

      // Append each file in the media array
      this.media.controls.forEach((control, index) => {
        formData.append(`media[${index}]`, control.value);
      });

      this.recipe.addRecipe(this.formData)
      console.log(this.formData);
    }
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
    const file = input.files[0];
    console.log(file);
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
