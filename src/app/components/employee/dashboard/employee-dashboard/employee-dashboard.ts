import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface EmployeeSkill {
  id?: number;
  skillId: number;
  name?: string;
  category?: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.css']
})
export class EmployeeDashboardComponent implements OnInit {
  // 🔹 Properties used in template
  employeeName: string = '';
  employeeId: number | null = null;

  employeeSkills: EmployeeSkill[] = [];
  availableSkills: Skill[] = [];
  skillForm!: FormGroup;
  editingSkill: EmployeeSkill | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize reactive form
    this.skillForm = this.fb.group({
      skillId: [null, Validators.required],
      proficiencyLevel: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      yearsOfExperience: [0, [Validators.required, Validators.min(0)]]
    });

    // Load data
    this.loadCurrentUser();
    this.loadEmployeeSkills();
    this.loadAvailableSkills();
  }

  // 🔹 Fetch logged-in user details
  loadCurrentUser(): void {
    const token = localStorage.getItem('jwt'); // wherever you store it after login
    this.http.get<any>('http://localhost:9090/employee/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(user => {
      this.employeeName = user.name;
      this.employeeId = user.id;
    });
  }


  // 🔹 Fetch employee skills
  loadEmployeeSkills(): void {
    this.http.get<EmployeeSkill[]>('http://localhost:9090/employee/skills')
      .subscribe(data => this.employeeSkills = data);
  }

  // 🔹 Fetch available skills
  loadAvailableSkills(): void {
    this.http.get<Skill[]>('http://localhost:9090/skills')
      .subscribe(data => this.availableSkills = data);
  }

  // 🔹 Add new skill
  addSkill(): void {
    if (this.skillForm.valid) {
      const newSkill = this.skillForm.value;
      this.http.post('http://localhost:9090/employee/skills', [newSkill])
        .subscribe(() => {
          this.loadEmployeeSkills();
          this.skillForm.reset({ proficiencyLevel: 1, yearsOfExperience: 0 });
        });
    }
  }

  // 🔹 Edit skill (prefill form)
  editSkill(skill: EmployeeSkill): void {
    this.editingSkill = skill;
    this.skillForm.patchValue({
      skillId: skill.skillId,
      proficiencyLevel: skill.proficiencyLevel,
      yearsOfExperience: skill.yearsOfExperience
    });
  }

  // 🔹 Update skill
  updateSkill(): void {
    if (this.editingSkill && this.skillForm.valid) {
      const updatedSkill = this.skillForm.value;
      this.http.put(`http://localhost:9090/employee/skills/${this.editingSkill.id}`, updatedSkill)
        .subscribe(() => {
          this.loadEmployeeSkills();
          this.editingSkill = null;
          this.skillForm.reset({ proficiencyLevel: 1, yearsOfExperience: 0 });
        });
    }
  }

  // 🔹 Delete skill
  deleteSkill(id: number): void {
    this.http.delete(`http://localhost:9090/employee/skills/${id}`)
      .subscribe(() => this.loadEmployeeSkills());
  }
}
