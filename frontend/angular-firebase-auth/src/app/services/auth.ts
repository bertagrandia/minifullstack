import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  authState
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private auth = inject(Auth);

  user$ = authState(this.auth);

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .catch((error: any) => {
        throw new Error(this.getFirebaseErrorMessage(error.code));
      });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .catch((error: any) => {
        throw new Error(this.getFirebaseErrorMessage(error.code));
      });
  }

  logout() {
    return signOut(this.auth);
  }

  private getFirebaseErrorMessage(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este correo ya está registrado.';
      case 'auth/invalid-email':
        return 'El correo no es válido.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      case 'auth/user-not-found':
        return 'Usuario no encontrado. Regístrate primero.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta. Verifica nuevamente.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Intenta más tarde.';
      case 'auth/internal-error':
        return 'Error interno. Intenta de nuevo.';
      default:
        return 'Error de autenticación. Verifica tus datos e intenta nuevamente.';
    }
  }
}