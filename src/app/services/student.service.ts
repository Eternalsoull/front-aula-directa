// student.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  name: string;
  grade_id: number;
  parent_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, {
      headers: this.getAuthHeaders(),
    });
  }

  update(id: number, student: Student): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, student, {
      headers: this.getAuthHeaders(),
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
