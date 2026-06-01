import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

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
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  async register() {
    this.error = '';

    if (!this.email.trim() || !this.password || !this.confirmPassword) {
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
      await this.auth.register(this.email.trim(), this.password);
      this.router.navigate(['/bubbleteas']);
    } catch (err: any) {
      this.error = err?.message || 'No se pudo crear la cuenta. Intenta de nuevo.';
    }
  }
}