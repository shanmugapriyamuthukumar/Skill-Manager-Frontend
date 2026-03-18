import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface SkillOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-project.html',
  styleUrls: ['./create-project.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  availableSkills: SkillOption[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef   // ✅ inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      requiredSkills: this.fb.array([])
    });

    this.loadSkills();
    this.addSkill(); // start with one skill row
  }

  get requiredSkills(): FormArray {
    return this.projectForm.get('requiredSkills') as FormArray;
  }

  addSkill(): void {
    this.requiredSkills.push(
      this.fb.group({
        skillId: [null, Validators.required],
        requiredLevel: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
      })
    );
  }

  removeSkill(index: number): void {
    this.requiredSkills.removeAt(index);
  }

  loadSkills(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<SkillOption[]>('http://localhost:9090/skills', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.availableSkills = data;
        this.cdRef.detectChanges();   // ✅ force UI refresh after async update
      },
      error: err => console.error('Error loading skills:', err)
    });
  }

  createProject(): void {
    if (this.projectForm.valid) {
      const token = localStorage.getItem('jwt');
      const payload = this.projectForm.value;

      this.http.post('http://localhost:9090/projects/add', payload, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => alert('Project created successfully'),
        error: (err) => {
          console.error('Error creating project:', err);
          alert(err.error?.error || 'Error creating project');
        }
      });
    }
  }
}
