import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';

  // Sujeto reactivo para mantener el rol del usuario en memoria viva
  private roleSubject = new BehaviorSubject<string | null>(this.getStoredUserRole());
  public role$ = this.roleSubject.asObservable(); // Expuesto como observable para los componentes

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.roleSubject.next(response.user?.role || null); // Notifica el cambio de rol
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    const user = this.getFullUser();
    return user?.name || null;
  }

  getUserRole(): string | null {
    return this.roleSubject.value;
  }

  getFullUser(): any | null {
    try {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.clear();
    this.roleSubject.next(null);
    this.router.navigate(['/']);
  }

  // Inicializa rol desde localStorage para mantenerlo tras refresh
  private getStoredUserRole(): string | null {
    try {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      return user?.role || null;
    } catch {
      return null;
    }
  }
}
