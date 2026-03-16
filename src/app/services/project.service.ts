import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn:'root'
})
export class ProjectService {

  constructor(private api:ApiService){}

  getProjects(){
    return this.api.get("/projects");
  }

  createProject(data:any){
    return this.api.post("/projects",data);
  }

}