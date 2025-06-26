import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Estudiante {
  id: number;
  nombre: string;
  presente: boolean;
}

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencia.component.html'
})
export class AsistenciaComponent implements OnInit {
  grupos: any[] = [];
  estudiantes: Estudiante[] = [];
  selectedGroupId: number = 0;
  fecha: string = new Date().toISOString().slice(0, 10);
  mensaje: string = '';

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getGruposPorProfesor().subscribe({
      next: res => {
        this.grupos = res;
        this.mensaje = this.grupos.length ? '' : '⚠️ No tienes grupos asignados.';
      },
      error: err => {
        console.error('❌ Error al cargar grupos:', err);
        this.mensaje = '❌ Error al cargar los grupos del profesor.';
      }
    });
  }

  cargarEstudiantes(): void {
    if (!this.selectedGroupId) return;

    this.teacherService.getEstudiantesPorGrupo(this.selectedGroupId).subscribe({
      next: (res) => {
        this.estudiantes = res.map(est => ({
          id: est.student?.id || est.id,
          nombre: est.student?.nombre || 'Sin nombre',
          presente: true
        }));
        this.mensaje = '';
      },
      error: (err) => {
        console.error('❌ Error al cargar estudiantes:', err);
        this.mensaje = '❌ No se pudieron obtener los estudiantes del grupo.';
      }
    });
  }

  guardarAsistencia(): void {
    if (!this.selectedGroupId || !this.estudiantes.length) return;

    const registros = this.estudiantes.map(est => ({
      student_id: est.id,
      class_grade_id: this.selectedGroupId,
      fecha: this.fecha,
      presente: est.presente
    }));

    this.teacherService.registrarAsistencia(registros).subscribe({
      next: () => {
        this.mensaje = '✅ Asistencia guardada con éxito.';
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: (err) => {
        console.error('❌ Error al registrar asistencia:', err);
        this.mensaje = '❌ No se pudo guardar la asistencia.';
      }
    });
  }
}
