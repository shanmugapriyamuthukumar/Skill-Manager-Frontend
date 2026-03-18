import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Project, ProjectSkill } from '../../../../models/project.model';
import { ProjectService } from '../../../../services/project.service';


@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-project.html',
})


export class CreateProjectComponent implements OnInit {

  project: Project = {
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
    this.projectService.getLastProjectId().subscribe(id => {
      this.lastProjectId = id + 1; // Auto increment
      this.project.projectId = this.lastProjectId;
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
      next: response => {
        alert("Project created successfully!");
      },
      error: err => {
        alert("Error creating project!");
      }
    });
  }
}