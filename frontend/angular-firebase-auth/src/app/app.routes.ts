import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { BubbleteaListComponent } from './pages/bubbletea-list/bubbletea-list';
import { Home } from './pages/pages/home/home';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },

  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'bubbleteas', component: BubbleteaListComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'login' }
];