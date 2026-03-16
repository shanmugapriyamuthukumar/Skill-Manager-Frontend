import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';  // <-- correct import


@Injectable({ providedIn: 'root' })
export class AuthService {
  api = "http://localhost:9090/auth";

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post<{token: string}>(`${this.api}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  getRole(): string | null {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.role || null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
