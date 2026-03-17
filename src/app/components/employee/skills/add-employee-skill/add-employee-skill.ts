import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Skill {
  id: number;
  name: string;
  category: string;
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

  constructor(private fb: FormBuilder, private http: HttpClient, private cd: ChangeDetectorRef) {}

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
    }).subscribe({
      next: data => {
        this.availableSkills = data;
        this.cd.detectChanges();
      },
      error: err => console.error('Error fetching skills:', err)
    });
  }

  addSkill(): void {
    if (this.addSkillForm.valid) {
      const token = localStorage.getItem('jwt');
      const payload = this.addSkillForm.value; // ✅ send object, not array

      this.http.post('http://localhost:9090/employee/skills', payload, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => {
          alert('Skill added successfully');
          this.addSkillForm.reset({ proficiencyLevel: 1, yearsOfExperience: 0 });
        },
        error: (err) => {
          if (err.status === 400 && err.error?.message) {
            alert(err.error.message); // e.g. "Skill already exists for this employee"
          } else {
            alert("Duplicate skill");
          }
        }
      });
    }
  }
}
