import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn:'root'
})
export class SkillService {

  constructor(private api:ApiService){}

  getSkills(){
    return this.api.get("/skills");
  }

  addSkill(data:any){
    return this.api.post("/skills",data);
  }

  updateSkill(id:number,data:any){
    return this.api.put(`/skills/${id}`,data);
  }

  deleteSkill(id:number){
    return this.api.delete(`/skills/${id}`);
  }

}