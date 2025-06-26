import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:3000/api/teachers';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }

  getGruposAsignados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mis-grupos`, {
      headers: this.getAuthHeaders()
    });
  }

  crearTarea(payload: {
    class_grade_id: number;
    title: string;
    description?: string;
    due_date: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/tareas`, payload, {
      headers: this.getAuthHeaders()
    });
  }

  getTareasPorGrupo(classGradeId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/grupos/${classGradeId}/tareas`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }
  getTareasPorPadre(padreId: number): Observable<any[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<any[]>(`http://localhost:3000/api/calificaciones/padre/${padreId}`, {
    headers
  });
}
}
