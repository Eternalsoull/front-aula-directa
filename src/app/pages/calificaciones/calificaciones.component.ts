import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalificacionService, Calificacion } from '../../services/calificacion.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  templateUrl: './calificaciones.component.html',
  imports: [CommonModule, FormsModule],
})
export class CalificacionesComponent implements OnInit {
  calificaciones: any[] = [];
  userRole: string | null = '';
  grupos: any[] = [];
  selectedGroupId: number | null = null;

  constructor(
    private calificacionService: CalificacionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getFullUser();
    this.userRole = this.authService.getUserRole();

    if (this.userRole === 'parent') {
      this.calificacionService.getCalificacionesPorPadre(user?.id).subscribe((data: Calificacion[]) => {
        this.calificaciones = data;
      });
    } else if (this.userRole === 'teacher') {
      this.calificacionService.getGruposPorProfesor(user?.id).subscribe((grupos: any[]) => {
        this.grupos = grupos;
      });
    }
  }

  cargarCalificacionesDelGrupo(): void {
    if (this.selectedGroupId) {
      this.calificacionService.getCalificacionesPorGrupo(this.selectedGroupId).subscribe((data: any[]) => {
        this.calificaciones = data.map(c => ({
          student_id: c.student?.id ?? c.student_id,
          nombre_estudiante: c.student?.name ?? c.nombre_estudiante ?? 'Estudiante',
          nota: c.score ?? 0,
          comentario: c.comment ?? ''
        }));
      });
    }
  }

  guardarNotas(): void {
    const payload = {
      calificaciones: this.calificaciones.map(c => ({
        student_id: c.student_id,
        score: c.nota,
        comment: c.comentario
      }))
    };

    this.calificacionService.guardarNotas(payload).subscribe(() => {
      alert('✅ Calificaciones guardadas correctamente');
    });
  }
}
