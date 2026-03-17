import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/admin'; 

  constructor(private http: HttpClient) {}

  getAdminDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/details`);
  }

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }
}