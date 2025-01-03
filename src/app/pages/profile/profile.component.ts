import { Component } from '@angular/core';
import { AuthManager } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, SpinnerComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userData$ = this.state.getState();
  isEdit = false;
  username = '';
  bio = '';
  img = '';
  formData = new FormData();
  image = ''

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
    this.onEdit();
    this.formData.append('username', this.username);
    this.formData.append('bio', this.bio);
    if (this.file) {
      this.formData.append('profileImage', this.file);
    }
    console.log(this.file);

    this.state.updateUser(this.formData)
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => (this.image = reader.result as string);
      reader.readAsDataURL(this.file);
    }
  }
}
