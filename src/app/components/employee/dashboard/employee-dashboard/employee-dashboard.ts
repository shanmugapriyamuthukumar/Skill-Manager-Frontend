import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service'; // adjust path if needed

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface EmployeeSkill {
  id: number;
  skillId: number;
  skillName: string;
  category: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employeeName: string = '';
  employeeId: number | null = null;
  employeeSkills: EmployeeSkill[] = [];
  skills: Skill[] = [];

  // Add Skill form inputs
  selectedSkillId: number = 0;
  newProficiency: number | null = null;
  newExperience: number | null = null;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadEmployeeSkills();
    this.loadSkills();
  }

  loadCurrentUser(): void {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    this.http.get<any>('http://localhost:9090/employee/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: user => {
        this.employeeName = user.name;
        this.employeeId = user.id;
        this.cd.detectChanges();
      },
      error: err => {
        console.error(err);
        this.toastService.show('Error loading employee info', 'error');
      }
    });
  }

  loadEmployeeSkills(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<EmployeeSkill[]>('http://localhost:9090/employee/skills', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.employeeSkills = data;
        this.cd.detectChanges();
      },
      error: err => {
        console.error(err);
        this.toastService.show('Error loading employee skills', 'error');
      }
    });
  }

  loadSkills(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<Skill[]>('http://localhost:9090/skills/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.skills = data;
        this.cd.detectChanges();
      },
      error: err => {
        console.error(err);
        this.toastService.show('Error loading skills list', 'error');
      }
    });
  }

  addSkill(): void {
    if (!this.selectedSkillId) {
      this.toastService.show('Please select a skill', 'error');
      return;
    }

    const token = localStorage.getItem('jwt');
    const payload = {
      skillId: this.selectedSkillId,
      proficiencyLevel: this.newProficiency,
      yearsOfExperience: this.newExperience
    };

    this.http.post('http://localhost:9090/employee/skills/add', payload, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.toastService.show('Skill added successfully', 'success');
        this.selectedSkillId = 0;
        this.newProficiency = 1;
        this.newExperience = 0;
        this.loadEmployeeSkills();
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Error adding skill', 'error');
      }
    });
  }

  updateSkill(skill: EmployeeSkill): void {
    const token = localStorage.getItem('jwt');
    this.http.put(`http://localhost:9090/employee/skills/${skill.id}`, skill, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.toastService.show('Skill updated successfully', 'success');
        this.loadEmployeeSkills();
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Error updating skill', 'error');
      }
    });
  }

  deleteSkill(skillId: number): void {
    const token = localStorage.getItem('jwt');
    this.http.delete(`http://localhost:9090/employee/skills/${skillId}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.toastService.show('Skill deleted successfully', 'success');
        this.loadEmployeeSkills();
      },
      error: (err) => {
        console.error(err);
        this.toastService.show("Skill couldn't be deleted", 'error');
      }
    });
  }
}
