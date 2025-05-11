import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListarUsuariosComponent } from './pages/listar-usuarios/listar-usuarios.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // redirecciona raíz a login
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'usuarios', component: ListarUsuariosComponent },

  // Aquí luego pondremos más rutas como dashboard, perfiles, etc.
];
