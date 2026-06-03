import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { BubbleteaService } from '../../services/bubbletea.service';
import { BubbleTea, BubbleTeaPayload } from '../../model/bubblete.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bubbletea-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bubbletea-list.html',
  styleUrls: ['./bubbletea-list.scss']
})
export class BubbleteaListComponent implements OnInit {

  teas = signal<BubbleTea[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  showForm = signal(false);
  editingTea = signal<BubbleTea | null>(null);
  saving = signal(false);
  formError = signal<string | null>(null);
  searchQuery = signal('');
  selectedCategory = signal('all');

  filteredTeas = computed(() => {
    const search = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    return this.teas().filter(tea => {
      const matchesSearch = search === '' ||
        tea.name.toLowerCase().includes(search) ||
        tea.flavor.toLowerCase().includes(search);

      if (category === 'all') return matchesSearch;
      if (category === 'frutal') {
        const frutas = ['fresa', 'mango', 'frambuesa', 'piña', 'melocotón', 'limon', 'naranja', 'fruta'];
        return matchesSearch && frutas.some(f => tea.flavor.toLowerCase().includes(f));
      }
      if (category === 'cremoso') {
        const cremosos = ['leche', 'cream', 'milk', 'yogur', 'taro', 'café', 'chocolate'];
        return matchesSearch && cremosos.some(c => tea.flavor.toLowerCase().includes(c));
      }
      if (category === 'matcha') {
        return matchesSearch && tea.flavor.toLowerCase().includes('matcha');
      }
      return matchesSearch;
    });
  });

  formModel: BubbleTeaPayload = {
    nombre: '',
    tipo_bubbletea: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    active: true
  };

  private auth = inject(AuthService);
  private router = inject(Router);
  private bubbletea = inject(BubbleteaService);

  ngOnInit() {
    this.loadBubbleteas();
  }

  loadBubbleteas() {
    this.loading.set(true);
    this.error.set(null);
    this.bubbletea.getAll().subscribe({
      next: (data) => {
        this.teas.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading bubbleteas:', err);
        this.error.set('No se pudieron cargar los bubbleteas');
        this.loading.set(false);
      }
    });
  }

  openCreate() {
    this.formModel = { nombre: '', tipo_bubbletea: '', descripcion: '', precio: 0, stock: 0, active: true };
    this.editingTea.set(null);
    this.formError.set(null);
    this.showForm.set(true);
  }

  openEdit(tea: BubbleTea) {
    this.formModel = {
      nombre: tea.name,
      tipo_bubbletea: tea.flavor,
      descripcion: tea.descripcion ?? '',
      precio: tea.price,
      stock: tea.stock ?? 0,
      active: true
    };
    this.editingTea.set(tea);
    this.formError.set(null);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  submitForm() {
    this.saving.set(true);
    this.formError.set(null);
    const editing = this.editingTea();

    const request = editing
      ? this.bubbletea.update(editing.id, this.formModel)
      : this.bubbletea.create(this.formModel);

    request.subscribe({
      next: () => {
        this.showForm.set(false);
        this.loadBubbleteas();
        this.saving.set(false);
      },
      error: () => {
        this.formError.set('Error al guardar. Inténtalo de nuevo.');
        this.saving.set(false);
      }
    });
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
