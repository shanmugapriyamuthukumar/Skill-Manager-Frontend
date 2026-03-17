import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn:'root'
})
export class EmployeeService {

  constructor(private api:ApiService){}

  // Add new skill (rejects duplicates in backend)
  addSkill(data:any){
    return this.api.post("/employee/skills", data);
  }

  // Update existing skill
  updateSkill(id:number, data:any){
    return this.api.put(`/employee/skills/${id}`, data);
  }

  // Get all skills for current employee
  getMySkills(){
    return this.api.get("/employee/skills");
  }

  // Save profile
  saveProfile(data:any){
    return this.api.post("/employee/profile", data);
  }
}
