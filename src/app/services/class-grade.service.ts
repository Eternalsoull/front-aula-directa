import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ClassGrade {
  id?: number;
  class_id: number;
  grade_id: number;
  teacher_id: number;

  class?: {
    id: number;
    name: string;
  };

  grade?: {
    id: number;
    name: string;
  };

  teacher?: {
    id: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ClassGradeService {
  private apiUrl = 'http://localhost:3000/api/class-grades';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<ClassGrade[]> {
    return this.http.get<ClassGrade[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getById(id: number): Observable<ClassGrade> {
    return this.http.get<ClassGrade>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  create(classGrade: ClassGrade): Observable<ClassGrade> {
    return this.http.post<ClassGrade>(this.apiUrl, classGrade, {
      headers: this.getAuthHeaders()
    });
  }

  update(id: number, classGrade: ClassGrade): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, classGrade, {
      headers: this.getAuthHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
