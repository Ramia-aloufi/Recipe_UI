import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { login } from '../../states/user/user.action';
import { selectUser } from '../../states/user/user.selectors';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,private store:Store<AppState>,private router: Router) {
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
    this.store.dispatch(login({user}))
    this.router.navigate(['/'])
    

    console.log('Form Submitted', this.store.select(selectUser));
  }
}
