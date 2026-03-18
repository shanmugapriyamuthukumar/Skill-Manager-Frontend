import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private API_URL = 'http://localhost:9090/projects/all';

  constructor(private http: HttpClient) {}

  // ✅ GET all projects
  getProjects(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}