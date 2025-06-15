import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Class {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:3000/api/classes';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getById(id: number): Observable<Class> {
    return this.http.get<Class>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  create(classData: Class): Observable<Class> {
    return this.http.post<Class>(this.apiUrl, classData, {
      headers: this.getAuthHeaders()
    });
  }

  update(id: number, classData: Class): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, classData, {
      headers: this.getAuthHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
