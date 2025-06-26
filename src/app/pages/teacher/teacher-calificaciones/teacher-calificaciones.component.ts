import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CalificacionesService } from '../../services/calificaciones.service';

@Component({
  selector: 'app-teacher-calificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-calificaciones.component.html'
})
export class TeacherCalificacionesComponent implements OnInit {
  grupos: any[] = [];
  grupoSeleccionadoId: number | null = null;
  tareas: any[] = [];
  estudiantes: any[] = [];
  notas: { [key: string]: number } = {};

  constructor(
    private taskService: TaskService,
    private calificacionesService: CalificacionesService
  ) {}

  ngOnInit(): void {
    this.taskService.getGruposAsignados().subscribe({
      next: grupos => this.grupos = grupos,
      error: err => console.error('❌ Error al cargar grupos', err)
    });
  }

  seleccionarGrupo(id: number): void {
    this.grupoSeleccionadoId = id;
    this.cargarTareasYEstudiantes(id);
  }

  cargarTareasYEstudiantes(grupoId: number): void {
    this.taskService.getTareasPorGrupo(grupoId).subscribe({
      next: tareas => this.tareas = tareas
    });

    this.calificacionesService.getEstudiantesPorGrupo(grupoId).subscribe({
      next: estudiantes => this.estudiantes = estudiantes
    });

    this.notas = {};
  }

  guardarNota(tareaId: number, estudianteId: number): void {
    const nota = this.notas[`${tareaId}-${estudianteId}`];
    if (nota === undefined || nota === null) return;

    const payload = {
      tarea_id: tareaId,
      estudiante_id: estudianteId,
      nota
    };

    this.calificacionesService.guardarNota(payload).subscribe({
      next: () => console.log('✅ Nota guardada'),
      error: err => console.error('❌ Error al guardar nota', err)
    });
  }
}
