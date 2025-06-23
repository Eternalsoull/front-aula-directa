import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  classGrade: {
    class: { nombre: string };
    grade: { nombre: string };
  };
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareasApiUrl = 'http://localhost:3000/api/tareas';
  private profesorApiUrl = 'http://localhost:3000/api/profesor';

  constructor(private http: HttpClient) {}

  getTareasPorPadre(padreId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tareasApiUrl}/padre/${padreId}`);
  }

  getGruposPorProfesor(profesorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.profesorApiUrl}/mis-grupos/${profesorId}`);
  }

  getTareasPorGrupo(classGradeId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.profesorApiUrl}/classgrade/${classGradeId}/tareas`);
  }
  crearTarea(tarea: any): Observable<any> {
  return this.http.post(`${this.profesorApiUrl}/tareas`, tarea);
}
}
