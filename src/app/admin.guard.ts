import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserManager } from './states/user.state';

export const adminGuard: CanActivateFn = (route, state) => {
  inject(UserManager).user$ == null
  const router = inject(Router);

  if (inject(UserManager).isAdmin()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
