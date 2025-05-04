import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveUserData(user: any): void {
    // Guarda el nombre del usuario en localStorage
    localStorage.setItem('userName', user.name);
  }

  getUserData(): string | null {
    return localStorage.getItem('userName');
  }
}
