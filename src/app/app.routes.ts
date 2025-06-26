import { Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LayoutMenuSidebarComponent } from './pages/layout-menu-sidebar/layout-menu-sidebar.component';
import { ClassComponent } from './pages/class/class.component';
import { ClassFormComponent } from './pages/class/class-form.component';
import { GradesComponent } from './pages/grades/grades.component';
import { StudentsComponent } from './pages/students/students.component';
import { ClassGradesComponent } from './pages/class-grades/class-grades.component';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';

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
          { path: 'clases/nueva', component: ClassFormComponent },
          { path: 'grados', component: GradesComponent },
          { path: 'grados/nuevo', component: GradesComponent },
          { path: 'estudiantes', component: StudentsComponent },
          { path: 'clases-grados', component: ClassGradesComponent },
          { path: 'calificaciones', component: CalificacionesComponent },

          {
            path: 'tareas',
            children: [
              {
                path: 'asignar',
                loadComponent: () =>
                  import('./pages/tareas/asignar-tarea.component').then(m => m.AsignarTareaComponent)
              },
              {
                path: 'hijos',
                loadComponent: () =>
                  import('./pages/tareas/tareas-acudiente.component').then(m => m.TareasAcudienteComponent)
              }
            ]
          },

          {
            path: 'asistencia',
            loadComponent: () =>
              import('./pages/teacher/asistencia/asistencia.component').then(m => m.AsistenciaComponent)
          },
          {
            path: 'chat',
            loadComponent: () =>
              import('./pages/teacher/chat/chat.component').then(m => m.ChatComponent)
          }
        ]
      }
    ]
  }
];
