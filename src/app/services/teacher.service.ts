import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Teacher {
  id?: number;
  user_id: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:3000/api/teachers';
  private baseProfesorUrl = 'http://localhost:3000/api/profesor';

  constructor(private http: HttpClient) {}

  // CRUD original
  getAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  create(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  update(id: number, teacher: Teacher): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, teacher);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 👇 Nuevos métodos para módulo docente

  getGruposPorProfesor(profesorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseProfesorUrl}/mis-grupos/${profesorId}`);
  }

  getEstudiantesPorGrupo(classGradeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseProfesorUrl}/classgrade/${classGradeId}/estudiantes`);
  }

  registrarAsistencia(payload: {
    classgrade_id: number;
    date: string;
    asistencias: { student_id: number; present: boolean }[];
  }): Observable<any> {
    return this.http.post(`${this.baseProfesorUrl}/asistencia`, payload);
  }

  enviarMensajeAlAcudiente(payload: {
    student_id: number;
    content: string;
  }): Observable<any> {
    return this.http.post(`${this.baseProfesorUrl}/mensaje`, payload);
  }
}
