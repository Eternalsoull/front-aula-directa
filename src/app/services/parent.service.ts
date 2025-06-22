import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Parent {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private apiUrl = 'http://localhost:3000/api/parents';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<Parent[]> {
  return this.http.get<Parent[]>(this.apiUrl, {
    headers: this.getAuthHeaders()
  });
}


  getById(id: number): Observable<Parent> {
    return this.http.get<Parent>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  create(parent: Parent): Observable<Parent> {
    return this.http.post<Parent>(this.apiUrl, parent, {
      headers: this.getAuthHeaders()
    });
  }

  update(id: number, parent: Parent): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, parent, {
      headers: this.getAuthHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
