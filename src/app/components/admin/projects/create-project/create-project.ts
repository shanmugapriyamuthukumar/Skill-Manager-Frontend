import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Your models
import { Project, ProjectSkill } from '../../../../models/project.model';

// Your service
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-project.html',
})
export class CreateProjectComponent implements OnInit {

  project: Project = {
    projectId: 0,
    projectName: '',
    requiredSkills: []
  };

  newSkill: ProjectSkill = {
    skillName: '',
    proficiency: ''
  };

  lastProjectId: number = 0;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getLastProjectId().subscribe({
      next: (id) => {
        this.lastProjectId = id + 1;      // Auto increment logic
        this.project.projectId = this.lastProjectId;
      },
      error: () => {
        console.error("Failed to load last project ID");
      }
    });
  }

  addSkill() {
    if (this.newSkill.skillName && this.newSkill.proficiency) {
      this.project.requiredSkills.push({ ...this.newSkill });
      this.newSkill = { skillName: '', proficiency: '' };
    }
  }

  removeSkill(index: number) {
    this.project.requiredSkills.splice(index, 1);
  }

  submitProject() {
    this.projectService.createProject(this.project).subscribe({
      next: () => {
        alert("Project created successfully!");
      },
      error: () => {
        alert("Error creating project!");
      }
    });
  }
}
