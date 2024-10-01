import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SignupFormComponent } from '../../components/signup-form/signup-form.component';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginFormComponent,SignupFormComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})

export class AuthComponent {
  isLoginMode = true;
  images = [
    'https://images.squarespace-cdn.com/content/v1/51c1efe0e4b0b485e9579892/1610657649168-9T8Q1OTBQ3KSJG11WA8W/23.%2BNew_Work_01%2BA.jpg',
    'https://images.squarespace-cdn.com/content/v1/5df35ef8a9f7b746fbb26152/c3fec3d1-aa72-4dbe-9c43-ab8286359c1f/scp-8400.jpg',
    'https://french.ly/wp-content/uploads/sites/9065/2021/01/Cabbage-and-Eggplant-Food-Photography-Frenchly-Photography-1699.jpg',
  ];
  randomIndex = Math.floor(Math.random() * this.images.length);
  randomImage = this.images[this.randomIndex];

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
