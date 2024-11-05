import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  categoryState$ = this.state.getState();
  isSubmitted = false;
  selectedFile: File | null = null;
  formData = new FormData();
  recipeData: Recipe | null = null
  imagePreview: string = '';

  @Output() notifyToggle = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private state: CategoryManager,
    private recipe: RecipeManager,
    private cdRef: ChangeDetectorRef
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required, Validators.min(3)],
      preparationTime: [0, [Validators.required, Validators.min(1)]],
      cookingTime: [0, [Validators.required, Validators.min(1)]],
      servings: [0, [Validators.required, Validators.min(1)]],
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
  ngOnInit() {
    this.recipe.recipeData.subscribe((data) => {
      if (data) {
        this.recipeData = data
        this.recipeForm.patchValue({ ...data, category: data.category._id });
        this.setFormArrayValues(this.ingredients, data.ingredients);
        this.setFormArrayValues(this.steps, data.steps);
        this.imagePreview = data.media[0]
        this.cdRef.detectChanges();
      }
    });
  }
  setFormArrayValues(formArray: FormArray, values: String[]) {
    formArray.clear();
    values.forEach((value) => {
      formArray.push(this.fb.control(value));
    });
  }
  triggerToggle() {
    this.notifyToggle.emit();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }
    if (this.isSubmitted && this.recipeForm.valid) {
      this.formData.append('title', this.recipeForm.get('title')?.value);
      this.formData.append('description', 'description');
      this.formData.append('preparationTime', this.recipeForm.get('preparationTime')?.value);
      this.formData.append('cookingTime', this.recipeForm.get('cookingTime')?.value);
      this.formData.append('servings', this.recipeForm.get('servings')?.value);
      this.formData.append('category', this.recipeForm.get('category')?.value);
      this.ingredients.controls.forEach((control) => {
        this.formData.append(`ingredients`, control.value);
      });
      this.steps.controls.forEach((control, index) => {
        this.formData.append(`steps`, control.value);
      });
      if (this.selectedFile) {
        console.log(this.selectedFile);
        console.log("lllll");
        this.media.controls.forEach((control, index) => {
          this.formData.append(`media`, control.value);
        });
      }
      if (!this.recipeData) {
        this.recipe.addRecipe(this.formData);
      } else {
        this.recipe.updateRecipe(this.formData, this.recipeData._id);
      }
      this.recipe.getState().subscribe(state => {
        if (!state.error) {
          this.recipeForm.reset()
          this.triggerToggle()
        }
      })
    }
  }
  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;

      this.media.at(index).setValue(file);
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }
  getErrorMessage(field: string): string {
    const control = this.recipeForm.get(field);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) {
        return `${field} is required.`;
      }
      if (control.errors['minlength']) {
        return `${field} must be at least ${control.errors['minlength'].requiredLength} characters long.`;
      }
      if (control.errors['maxlength']) {
        return `${field} cannot be more than ${control.errors['maxlength'].requiredLength} characters long.`;
      }
    }
    return '';
  }

}
