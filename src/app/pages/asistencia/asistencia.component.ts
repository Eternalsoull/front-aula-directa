import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  templateUrl: './asistencia.component.html',
  imports: [CommonModule, FormsModule],
})
export class AsistenciaComponent implements OnInit {
  grupos: any[] = [];
  estudiantes: any[] = [];
  selectedGroupId: number | null = null;
  fechaHoy: string = new Date().toISOString().slice(0, 10);

  constructor(
    private http: HttpClient,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.taskService.getGruposAsignados().subscribe({
      next: (grupos) => this.grupos = grupos,
      error: (err) => console.error('❌ Error al obtener grupos:', err)
    });
  }

  seleccionarGrupo(): void {
    if (!this.selectedGroupId) return;

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(
      `http://localhost:3000/api/students/por-grado/${this.selectedGroupId}`,
      { headers }
    ).subscribe({
      next: (estudiantes) => {
        this.estudiantes = estudiantes.map(e => ({
          student_id: e.id,
          nombre_estudiante: e.name,
          presente: true
        }));
      },
      error: err => console.error('❌ Error al obtener estudiantes del grupo:', err)
    });
  }

  guardarAsistencia(): void {
    if (!this.selectedGroupId || this.estudiantes.length === 0) {
      alert('Debes seleccionar un grupo');
      return;
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = this.estudiantes.map(e => ({
      student_id: e.student_id,
      class_grade_id: this.selectedGroupId,
      date: this.fechaHoy,
      present: e.presente
    }));

    this.http.post(`http://localhost:3000/api/asistencia/lote`, payload, { headers }).subscribe({
      next: () => alert('✅ Asistencia registrada correctamente'),
      error: (err) => {
        console.error('❌ Error al guardar asistencia:', err);
        alert('Error al guardar asistencia');
      }
    });
  }
}
