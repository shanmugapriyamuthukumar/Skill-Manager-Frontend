import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface EmployeeSkill {
  id: number;               // EmployeeSkill record ID
  skillId: number;          // Skill ID
  skillName: string;
  category: string;
  proficiencyLevel: number;
  yearsOfExperience: number;
}

@Component({
  selector: 'app-update-employee-skill',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './update-employee-skill.html',
  styleUrls: ['./update-employee-skill.css']
})
export class UpdateEmployeeSkillComponent implements OnInit {
  updateSkillForm!: FormGroup;
  mySkills: EmployeeSkill[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.updateSkillForm = this.fb.group({
      selectedSkillId: [null, Validators.required],
      proficiencyLevel: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      yearsOfExperience: [null, [Validators.required, Validators.min(0)]]
    });

    this.loadMySkills();
  }

  loadMySkills(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<EmployeeSkill[]>('http://localhost:9090/employee/skills', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.mySkills = data;

        // Auto-select first skill and patch defaults
        if (this.mySkills.length > 0) {
          const first = this.mySkills[0];
          this.updateSkillForm.patchValue({
            selectedSkillId: first.id,
            proficiencyLevel: first.proficiencyLevel,
            yearsOfExperience: first.yearsOfExperience
          });
        }
      },
      error: err => console.error('Error fetching employee skills:', err)
    });
  }

  onSkillChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const skillId = Number(selectElement.value);

    const selected = this.mySkills.find(s => s.id === skillId);
    if (selected) {
      this.updateSkillForm.patchValue({
        proficiencyLevel: selected.proficiencyLevel,
        yearsOfExperience: selected.yearsOfExperience
      });
    }
  }

  updateSkill(): void {
    if (this.updateSkillForm.valid) {
      const token = localStorage.getItem('jwt');
      const id = this.updateSkillForm.value.selectedSkillId;

      // ✅ Payload matches EmployeeSkillUpdateRequest
      const payload = {
        proficiencyLevel: this.updateSkillForm.value.proficiencyLevel,
        yearsOfExperience: this.updateSkillForm.value.yearsOfExperience
      };

      this.http.put(`http://localhost:9090/employee/skills/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => alert('Skill updated successfully'),
        error: (err) => {
          console.error('Update error:', err);
          alert(err.error?.error || 'Error updating skill');
        }
      });
    }
  }
}
