import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { BubbleteaService } from '../../services/bubbletea.service';
import { BubbleTea } from '../../model/bubblete.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bubbletea-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bubbletea-list.html',
  styleUrls: ['./bubbletea-list.scss']
})
export class BubbleteaListComponent implements OnInit {

  teas: BubbleTea[] = [];
  loading = true;
  error: string | null = null;

  private auth = inject(AuthService);
  private router = inject(Router);
  private bubbletea = inject(BubbleteaService);

  ngOnInit() {
    this.loadBubbleteas();
  }

  loadBubbleteas() {
    this.loading = true;
    this.error = null;
    this.bubbletea.getAll().subscribe({
      next: (data) => {
        this.teas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bubbleteas:', err);
        this.error = 'No se pudieron cargar los bubbleteas';
        this.loading = false;
      }
    });
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}