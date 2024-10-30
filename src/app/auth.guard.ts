import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
return  sessionStorage.getItem('token') ? true : ( router.navigate(['/auth']), false)
};
