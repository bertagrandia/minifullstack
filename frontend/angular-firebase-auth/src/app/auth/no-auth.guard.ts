import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export const NoAuthGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return from(auth.authStateReady()).pipe(
    map(() => auth.currentUser ? router.createUrlTree(['/bubbleteas']) : true)
  );
};
