import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authAdmin: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (
    inject(AuthService).isAuthenticated() &&
    inject(AuthService).hasPermission('admin')
  ) {
    return true;
  }
  return router.parseUrl('/login-admin');
};

export const authUser: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (
    inject(AuthService).isAuthenticated() &&
    inject(AuthService).hasPermission('admin')
  ) {
    return true;
  }
  return router.parseUrl('/login');
};
