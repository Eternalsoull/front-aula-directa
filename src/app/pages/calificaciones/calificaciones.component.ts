import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalificacionService, Calificacion } from '../../services/calificacion.service';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  templateUrl: './calificaciones.component.html',
  imports: [CommonModule, FormsModule],
})
export class CalificacionesComponent implements OnInit {
  calificaciones: Calificacion[] = [];
  grupos: any[] = [];
  estudiantes: any[] = [];
  selectedGroupId: number | null = null;
  userRole: string | null = '';
  user: any = null;

  constructor(
    private calificacionService: CalificacionService,
    private taskService: TaskService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getFullUser();
    this.userRole = this.authService.getUserRole();

    if (this.userRole === 'parent') {
      this.cargarCalificacionesDelPadre();
    }

    if (this.userRole === 'teacher') {
      this.cargarGruposDelDocente();
    }
  }

  cargarCalificacionesDelPadre(): void {
    if (!this.user?.id) return;
    this.calificacionService.getCalificacionesPorPadre(this.user.id).subscribe({
      next: (data: Calificacion[]) => this.calificaciones = data,
      error: err => console.error('❌ Error al obtener calificaciones del padre:', err)
    });
  }

  cargarGruposDelDocente(): void {
    this.taskService.getGruposAsignados().subscribe({
      next: (grupos: any[]) => {
        this.grupos = grupos;
        console.log('📚 Grupos obtenidos desde TaskService:', grupos);
      },
      error: err => console.error('❌ Error al obtener grupos del docente:', err)
    });
  }

  seleccionarGrupo(): void {
    if (!this.selectedGroupId) return;

    this.http.get<any[]>(`http://localhost:3000/api/students/by-grade/${this.selectedGroupId}`).subscribe({
      next: (estudiantes) => {
        this.estudiantes = estudiantes.map(e => ({
          student_id: e.id,
          nombre_estudiante: e.name,
          nota: 0,
          comentario: ''
        }));
      },
      error: err => console.error('❌ Error al obtener estudiantes del grupo:', err)
    });
  }

  guardarNotas(): void {
    if (this.estudiantes.length === 0) return;

    const payload = {
      calificaciones: this.estudiantes.map(e => ({
        student_id: e.student_id,
        tarea_id: null,
        nota: e.nota,
        comentario: e.comentario
      }))
    };

    this.calificacionService.guardarNotas(payload).subscribe({
      next: () => alert('✅ Calificaciones guardadas correctamente'),
      error: err => {
        console.error('❌ Error al guardar calificaciones:', err);
        alert('Error al guardar las calificaciones');
      }
    });
  }
}
