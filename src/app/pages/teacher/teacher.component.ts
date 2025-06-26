import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [RouterModule], // 👈 esto es lo que faltaba
  template: `
    <nav>
      <a routerLink="tareas">📝 Tareas</a>
      <a routerLink="asistencia">📋 Asistencia</a>
      <a routerLink="calificaciones">📊 Calificaciones</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class TeacherComponent {}