import { Component } from '@angular/core';
import { AuthManager } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { RecipeCardComponent } from "../../components/recipe-card/recipe-card.component";
import { ProfileRecipeCardComponent } from "../../components/profile-recipe-card/profile-recipe-card.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    FormsModule,
    ProfileRecipeCardComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userData$ = this.state.getState();
  isEdit = false;
  username = '';
  bio = '';
  img = '';
  image = '';
  file: File | null = null;

  constructor(private state: AuthManager) {
    this.userData$.subscribe((data) => {
      this.username = data.data?.username ?? '';
      this.bio = data.data?.bio ?? '';
      this.img = data.data?.profileImage ?? '';
    });
  }

  onLogout() {
    this.state.logout();
  }
  onEdit() {
    this.isEdit = !this.isEdit;
  }
  onSubmit() {
    var formData = new FormData();
    this.onEdit();
    formData.append('username', this.username);
    formData.append('bio', this.bio);
    if (this.file) {
      formData.append('profileImage', this.file);
    }

    
    this.state.updateUser(formData);
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.image = URL.createObjectURL(this.file);

      // const reader = new FileReader();
      // reader.onload = () => (this.image = reader.result as string);
      // reader.readAsDataURL(this.file);
    }
  }
}
