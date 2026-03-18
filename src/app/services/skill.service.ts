import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private api: ApiService,
    private http: HttpClient
  ) {}

  // Get all skills
  getSkills() {
    return this.api.get("/skills/all");
  }

  // Add new skill
  addSkill(data: any) {
    return this.api.post("/skills/add", data);
  }

  // Update skill
  updateSkill(id: number, data: any) {
    return this.api.put(`/skills/update/${id}`, data);
  }

  // Delete skill by ID
  deleteSkill(id: number) {
    return this.http.delete(`http://localhost:9090/skills/delete/${id}`, {
      responseType: 'text'
    });
  }
}