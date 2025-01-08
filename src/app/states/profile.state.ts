import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { RecipeManager } from './recipe.state';

@Injectable({
  providedIn: 'root',
})
export class ProfileManager extends StateService<User> {
  constructor(
    private service: UserService,
    private toaster: ToastrService,
    private recipe: RecipeManager
  ) {
    super();
  }

  getOne(name: string) {
    this.setLoading(true);
    this.service.getOne(name).subscribe({
      next: (res) => {
        this.setData(res.data);
      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message);
      },
    });
  }
  follow(name: string) {
    this.setLoading(true);
    this.service.follow(name).subscribe({
      next: (res) => {
        this.setData(res.data);
        console.log(res.data);
      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message);
        this.toaster.error(err.error.message);
      },
    });
  }
  unfollow(name: string) {
    this.setLoading(true);
    this.service.unfollow(name).subscribe({
      next: (res) => {
        this.setData(res.data);
        console.log(res.data);
      },
      error: (err: HttpErrorResponse) => {
        this.setError(err.error.message);
      },
    });
  }
}
