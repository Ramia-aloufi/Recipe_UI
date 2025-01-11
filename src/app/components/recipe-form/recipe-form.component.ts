import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
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
    styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  categoryState$ = this.state.getState();
  isSubmitted = false;
  selectedFile: File | null = null;
  formData = new FormData();
  imagePreview: string = '';
  recipeData: Recipe | null = null;

  @Output() notifyToggle = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private state: CategoryManager,
    private recipe: RecipeManager,
    private cdRef: ChangeDetectorRef
  ) {
    this.recipeForm = this.fb.group({
      title: [
        this.recipeData?.title || '',
        [Validators.required, Validators.min(3)],
      ],
      preparationTime: [
        this.recipeData?.preparationTime || '',
        [Validators.required, Validators.min(1)],
      ],
      cookingTime: [
        this.recipeData?.cookingTime || '',
        [Validators.required, Validators.min(1)],
      ],
      servings: [
        this.recipeData?.servings || '',
        [Validators.required, Validators.min(1)],
      ],
      category: [this.recipeData?.category || '', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      steps: this.fb.array([this.fb.control('', Validators.required)]),
      media: this.fb.array([this.fb.control(null, Validators.required)]),
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
        this.recipeData = data;
        this.setFormArrayValues(this.ingredients, data.ingredients);
        this.setFormArrayValues(this.steps, data.steps);
        this.setFormArrayValues(this.media, data.media);
        this.imagePreview = data.media[0];
        this.recipeForm.patchValue({
          ...data,
          category: data.category._id,
        });
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

  onSubmit() {
    this.isSubmitted = true;
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    this.prepareFormData();

    if (!this.recipeData) {
      this.recipe.addRecipe(this.formData);
    } else {
      this.recipe.updateRecipe(this.formData, this.recipeData._id);
    }
    this.handleSuccess();
  }
  prepareFormData() {
    this.formData = new FormData();
    this.formData.append('title', this.recipeForm.get('title')?.value);
    this.formData.append('description', 'description');
    this.formData.append(
      'preparationTime',
      this.recipeForm.get('preparationTime')?.value
    );
    this.formData.append(
      'cookingTime',
      this.recipeForm.get('cookingTime')?.value
    );
    this.formData.append('servings', this.recipeForm.get('servings')?.value);
    this.formData.append('category', this.recipeForm.get('category')?.value);

    this.ingredients.controls.forEach((control) => {
      this.formData.append('ingredients', control.value);
    });

    this.steps.controls.forEach((control) => {
      this.formData.append('steps', control.value);
    });

    if (this.selectedFile) {
      this.formData.append('media', this.selectedFile);
    }
  }
  handleSuccess() {
    this.recipe.getState().subscribe((state) => {
      if (!state.error) {
        this.reset()
      }
    });
  }
  reset(){
    this.recipeForm.reset();
    this.notifyToggle.emit();
    this.recipeData = null;
    this.selectedFile = null;
  }
  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      this.imagePreview = URL.createObjectURL(file);
      this.media.at(index).setValue(file);
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
  getIngredientErrorMessage(index: number): string {
    const control = this.ingredients.at(index);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) {
        return `Ingredient is required.`;
      }
      if (control.errors['minlength']) {
        return `Ingredient must be at least ${control.errors['minlength'].requiredLength} characters long.`;
      }
      if (control.errors['maxlength']) {
        return `Ingredient cannot be more than ${control.errors['maxlength'].requiredLength} characters long.`;
      }
    }
    return '';
  }
  updateForm(data: any) {
    this.recipeForm.get('title')?.setValue(data.title);
    this.setFormArrayValues(this.ingredients, data.ingredients);
    this.setFormArrayValues(this.steps, data.steps);
    this.setFormArrayValues(this.media, data.media); // media could be URLs or File objects
  }
}
