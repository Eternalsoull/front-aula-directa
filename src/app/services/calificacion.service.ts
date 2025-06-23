import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Calificacion {
  id?: number;
  nota: number;
  comentario: string;
  student_id?: number;
  nombre_estudiante?: string;
  tarea?: {
    title: string;
    due_date: string;
    classGrade: {
      class: { nombre: string };
      grade: { nombre: string };
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private apiUrl = 'http://localhost:3000/api/calificaciones';

  constructor(private http: HttpClient) {}

  getCalificacionesPorPadre(padreId: number): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/padre/${padreId}`);
  }

  getGruposPorProfesor(profesorId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/profesor/mis-grupos/${profesorId}`);
  }

  getCalificacionesPorGrupo(classGradeId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/profesor/classgrade/${classGradeId}/calificaciones`);
  }

  guardarNotas(payload: {
    calificaciones: { student_id: number; score: number; comment: string }[];
  }): Observable<any> {
    return this.http.post('/api/profesor/notas', payload);
  }
}
