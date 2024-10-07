import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManager } from '../../states/user.state';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder,private userManager:UserManager,private router: Router) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }
  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (this.isSubmitted) {
      const errors = control?.errors;
      if (errors?.['required']) return `${field} is required`;
      if (errors?.['minlength'])
        return `${field} must be at least ${errors?.['minlength'].requiredLength} characters long`;
      if (errors?.['email']) return 'Invalid email';
    }
    return '';
  }
  onSubmit() {
    
    this.isSubmitted = true;
    var {password,email} = this.loginForm.value
    if (this.loginForm.invalid) {
      return;
    }
    var user = {
      password:password,
      email:email
    }
    this.userManager.login(user)
    this.router.navigate(['/'])
      }
}
