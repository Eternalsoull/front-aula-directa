import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Grade {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = 'http://localhost:3000/api/grades';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getById(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(gradeData: Grade): Observable<Grade> {
    console.log('📌 Enviando grado al backend:', gradeData);
    return this.http.post<Grade>(this.apiUrl, gradeData, {
      headers: this.getAuthHeaders()
    });
  }

  update(id: number, gradeData: Grade): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, gradeData, {
      headers: this.getAuthHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
