import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher',
  standalone: true,
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  imports: [RouterModule, CommonModule]
})
export class TeacherComponent implements OnInit {
  activeView: 'tareas' | 'asistencia' | 'calificaciones' | 'chat' = 'tareas';

  ngOnInit(): void {
    // Lógica futura si quieres cargar algo al inicio
  }

  seleccionarVista(vista: 'tareas' | 'asistencia' | 'calificaciones' | 'chat') {
    this.activeView = vista;
  }
}
