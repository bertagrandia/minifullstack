import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  return from(auth.authStateReady()).pipe(
    switchMap(() => {
      const user = auth.currentUser;
      if (!user) return next(req);
      return from(user.getIdToken()).pipe(
        switchMap(token => next(req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        })))
      );
    })
  );
};
