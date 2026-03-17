import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface EmployeeSkill {
  id: number;
  skillId: number;
  skillName: string;
  category: string;          // ✅ new field
  proficiencyLevel: number;
  yearsOfExperience: number;
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterLink],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employeeName: string = '';
  employeeId: number | null = null;
  employeeSkills: EmployeeSkill[] = [];

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadEmployeeSkills();
  }

  loadCurrentUser(): void {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    this.http.get<any>('http://localhost:9090/employee/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(user => {
      this.employeeName = user.name;
      this.employeeId = user.id;
      this.cd.detectChanges(); // ✅ forces UI refresh immediately
    });
  }


  loadEmployeeSkills(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<EmployeeSkill[]>('http://localhost:9090/employee/skills', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(data => {
		this.employeeSkills = data,
		this.cd.detectChanges();
	});
  }
}
