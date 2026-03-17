import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Skill {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-employee-skill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-employee-skill.html',
  styleUrls: ['./add-employee-skill.css']
})
export class AddEmployeeSkillComponent implements OnInit {
  addSkillForm!: FormGroup;
  availableSkills: Skill[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.addSkillForm = this.fb.group({
      skillId: [null, Validators.required],
      proficiencyLevel: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      yearsOfExperience: [0, [Validators.required, Validators.min(0)]]
    });

    this.loadAvailableSkills();
  }

  loadAvailableSkills(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<Skill[]>('http://localhost:9090/skills/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(data => this.availableSkills = data);
  }

  addSkill(): void {
    if (this.addSkillForm.valid) {
      const token = localStorage.getItem('jwt');
      this.http.post('http://localhost:9090/employee/skills', [this.addSkillForm.value], {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => {
        alert('Skill added successfully');
        this.addSkillForm.reset({ proficiencyLevel: 1, yearsOfExperience: 0 });
      });
    }
  }
}
