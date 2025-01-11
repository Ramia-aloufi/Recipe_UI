import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthManager } from '../../states/auth.state';

@Component({
    selector: 'app-signup-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signup-form.component.html',
    styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder,private um:AuthManager) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }
  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (this.isSubmitted) {
      const errors = control?.errors;
      if (errors?.['required']) return `${field} is required`;
      if (errors?.['minlength'])
        return `${field} must be at least ${errors?.['minlength'].requiredLength} characters long`;
      if (errors?.['email']) return 'Invalid email';
      if (
        field === 'confirmPassword' &&
        this.registerForm.hasError('passwordMismatch')
      )
        return 'Passwords do not match';
    }
    return '';
  }

  onSubmit() {
    this.isSubmitted = true;
    var {username,password,email} = this.registerForm.value
    if (this.registerForm.invalid) {
      return;
    }
    var user = {
      username:username,
      password:password,
      email:email
    }
    this.um.signup(user)

  }
}
