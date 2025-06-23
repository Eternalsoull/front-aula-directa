import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../../services/teacher.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  templateUrl: './asistencia.component.html',
  imports: [CommonModule, FormsModule],
})
export class AsistenciaComponent implements OnInit {
  grupos: any[] = [];
  estudiantes: any[] = [];
  selectedGroupId!: number;
  fecha: string = new Date().toISOString().slice(0, 10);
  profesorId: number | null = null;

  constructor(
    private teacherService: TeacherService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getFullUser();
    this.profesorId = user?.id ?? null;

    if (this.profesorId !== null) {
      this.teacherService.getGruposPorProfesor(this.profesorId).subscribe((grupos: any[]) => {
        this.grupos = grupos;
      });
    }
  }

  cargarEstudiantes(): void {
    if (this.selectedGroupId) {
      this.teacherService.getEstudiantesPorGrupo(this.selectedGroupId).subscribe((data: any[]) => {
        this.estudiantes = data.map(est => ({
          ...est,
          presente: true
        }));
      });
    }
  }

  guardarAsistencia(): void {
    if (!this.selectedGroupId) return;

    const payload = {
      classgrade_id: this.selectedGroupId,
      date: this.fecha,
      asistencias: this.estudiantes.map(est => ({
        student_id: est.id,
        present: est.presente
      }))
    };

    this.teacherService.registrarAsistencia(payload).subscribe(() => {
      alert('✅ Asistencia registrada correctamente');
    });
  }
}
