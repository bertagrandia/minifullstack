import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private auth = inject(Auth);
  private router = inject(Router);

  get displayName(): string {
    return this.auth.currentUser?.displayName || this.auth.currentUser?.email || 'Usuario';
  }

  goToBubbleteas() {
    this.router.navigate(['/bubbleteas']);
  }
}
