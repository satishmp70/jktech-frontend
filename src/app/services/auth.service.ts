import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: { email: string; password: string }): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${environment.apiUrl}/auth/login`, payload).pipe(
      tap(response => {        
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/home']);
      })
    );
  }

  register(payload: { name?: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users`, payload).pipe(
      tap(() => {
        this.router.navigate(['/auth/login']);
      })
    );
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token || token.split('.').length !== 3) {
      return false;
    }
  
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;
  
      if (!exp) return false;
  
      const isExpired = Date.now() >= exp * 1000;
      return !isExpired;
    } catch (error) {
      console.error('JWT decode error:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded?.role || null;
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  handleOAuthCallback(provider: string = 'google') {
    return this.http.get<any>(`${environment.apiUrl}/auth/${provider}/redirect`, {
      withCredentials: true,
    });
  }

  googleLogin() {
    window.location.href = `${environment.apiUrl}/auth/google`;
  }
}
