import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  async login() {
    this.error = '';

    if (!this.email.trim() || !this.password) {
      this.error = 'Por favor completa email y contraseña.';
      return;
    }

    try {
      await this.auth.login(this.email.trim(), this.password);
      this.router.navigate(['/bubbleteas']);
    } catch (err: any) {
      this.error = err?.message ?? 'No se pudo iniciar sesión. Revisa tus credenciales.';
    }
  }
}