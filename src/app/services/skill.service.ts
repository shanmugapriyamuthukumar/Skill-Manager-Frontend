import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private api: ApiService) {}

  getSkills() {
    return this.api.get("/skills/all");
  }

  addSkill(data: any) {
    return this.api.post("/skills/add", data);
  }

  updateSkill(id: number, data: any) {
    return this.api.put(`/skills/update/${id}`, data);
  }

  deleteSkill(id: number) {
    return this.api.delete(`/skills/delete/${id}`);
  }
}
