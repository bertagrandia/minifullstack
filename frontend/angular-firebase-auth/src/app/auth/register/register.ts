import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { updateProfile } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {

  email = '';
  password = '';
  confirmPassword = '';
  name = '';
  surname = '';
  birth_date = '';
  error = '';

  private userService = inject(UserService);

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  async register() {
    this.error = '';

    if (!this.name.trim() || !this.surname.trim() || !this.birth_date || !this.email.trim() || !this.password || !this.confirmPassword) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    try {
      const cred = await this.auth.register(this.email.trim(), this.password);
      await updateProfile(cred.user, { displayName: `${this.name.trim()} ${this.surname.trim()}` });
      await firstValueFrom(this.userService.create({
        id: cred.user.uid,
        name: this.name.trim(),
        surname: this.surname.trim(),
        email: cred.user.email!,
        birth_date: this.birth_date
      }));
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err?.message || 'No se pudo crear la cuenta. Intenta de nuevo.';
    }
  }
}