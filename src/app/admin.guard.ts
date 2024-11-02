import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService).admin().pipe(map((admin)=>{
    if (admin) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }))

};
