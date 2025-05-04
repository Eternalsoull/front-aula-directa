import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // redirecciona raíz a login
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  // Aquí luego pondremos más rutas como dashboard, perfiles, etc.
];
