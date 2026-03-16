import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn:'root'
})
export class EmployeeService {

  constructor(private api:ApiService){}

  addSkill(data:any){
    return this.api.post("/employee-skills",data);
  }

  saveProfile(data:any){
    return this.api.post("/employee/profile",data);
  }

}