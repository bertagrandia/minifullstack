import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { BubbleteaListComponent } from './pages/bubbletea-list/bubbletea-list';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },

   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },

   {
      path: 'bubbleteas',
      component: BubbleteaListComponent,
      canActivate: [AuthGuard]
   }
];