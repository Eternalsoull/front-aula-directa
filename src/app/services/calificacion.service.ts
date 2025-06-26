import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Calificacion {
  student_id: number;
  nota: number;
  comentario?: string;
  // tarea_id?: number; ← puedes agregarlo si lo usas en otra vista
}

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  private apiUrl = 'http://localhost:3000/api/calificaciones';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // 🔹 Grupos asignados al docente (filtrados por backend)
  getGruposPorProfesor(teacherId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/tareas/grupos-asignados`, {
      headers: this.getHeaders(),
    });
  }

  // 🔹 Estudiantes del grupo según su grado
  getEstudiantesPorGrupo(classGradeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/grupos/${classGradeId}/estudiantes`, {
      headers: this.getHeaders(),
    });
  }

  // 🔹 Calificaciones ya registradas por grupo (opcional)
  getCalificacionesPorGrupo(classGradeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/grupos/${classGradeId}`, {
      headers: this.getHeaders(),
    });
  }

  // 🔹 Calificaciones de los hijos (para rol padre)
  getCalificacionesPorPadre(padreId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/padre/${padreId}`, {
      headers: this.getHeaders(),
    });
  }

  // 🔹 Enviar múltiples calificaciones (lote)
  guardarNotas(payload: { calificaciones: Calificacion[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/notas-lote`, payload, {
      headers: this.getHeaders(),
    });
  }

  // 🔹 Enviar una sola calificación (opcional)
  guardarUna(calificacion: Calificacion): Observable<any> {
    return this.http.post(`${this.apiUrl}/notas`, calificacion, {
      headers: this.getHeaders(),
    });
  }
}
