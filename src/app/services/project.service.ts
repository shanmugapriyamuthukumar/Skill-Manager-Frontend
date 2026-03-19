import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:9090/projects';

  constructor(private http: HttpClient) {}

  // GET all projects
  getProjects(): Observable<any[]> {
    const token = localStorage.getItem('jwt');
    return this.http.get<any[]>(`${this.baseUrl}/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // GET single project by ID
  getProjectById(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // DELETE project by ID
  deleteProject(id: number): Observable<void> {
    const token = localStorage.getItem('jwt');
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
