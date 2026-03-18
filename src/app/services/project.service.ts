import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:9090/projects';

  constructor(private http: HttpClient) {}

  createProject(project: Project): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, project);
  }

  getLastProjectId(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/last-id`);
  }
}