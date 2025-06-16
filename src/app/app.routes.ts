import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LayoutMenuSidebarComponent } from './pages/layout-menu-sidebar/layout-menu-sidebar.component';
import { ClassComponent } from './pages/class/class.component';  // ✅ Manteniendo la importación
import { ClassFormComponent } from './pages/class/class-form.component';  // ✅ Agregamos la importación del formulario

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },

      {
        path: 'dashboard',
        component: LayoutMenuSidebarComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'usuarios', component: UsuariosComponent },
          { path: 'clases', component: ClassComponent },
          { path: 'clases/nueva', component: ClassFormComponent },  // ✅ Agregamos la ruta del formulario
        ]
      }
    ]
  }
];
