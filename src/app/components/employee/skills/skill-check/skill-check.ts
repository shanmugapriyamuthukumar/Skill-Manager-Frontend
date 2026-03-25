import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ProjectSkill {
  skillId: number;
  skillName: string;
  requiredLevel: number;
}

interface Project {
  id: number;
  projectName: string;
  requiredSkills: ProjectSkill[];
}

interface EmployeeSkill {
  skillId: number;
  skillName: string;
  proficiencyLevel: number;
}

interface AptSkill {
  skillId: number;
  skillName: string;
  requiredLevel: number;
  current: number;
}

interface GapSkill {
  skillId: number;
  skillName: string;
  requiredLevel: number;
  current: number;
  gap: number;
}

@Component({
  selector: 'app-skill-check',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './skill-check.html',
  styleUrls: ['./skill-check.css']
})
export class SkillCheckComponent implements OnInit {
  projects: Project[] = [];
  employeeSkills: EmployeeSkill[] = [];
  expandedProjectId: number | null = null;

  missingSkills: ProjectSkill[] = [];
  aptSkills: AptSkill[] = [];
  gapSkills: GapSkill[] = [];

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadEmployeeSkills();
  }

  loadProjects(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<Project[]>('http://localhost:9090/projects/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(data => {
      this.projects = data;
      this.cd.detectChanges();
    });
  }

  loadEmployeeSkills(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<EmployeeSkill[]>('http://localhost:9090/employee/skills', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(data => {
      this.employeeSkills = data;
      this.cd.detectChanges();
    });
  }

  checkProject(project: Project): void {
    this.expandedProjectId = project.id;
    this.missingSkills = [];
    this.aptSkills = [];
    this.gapSkills = [];

    project.requiredSkills.forEach(req => {
      const empSkill = this.employeeSkills.find(s => s.skillId === req.skillId);

      if (!empSkill) {
        this.missingSkills.push(req);
      } else if (empSkill.proficiencyLevel >= req.requiredLevel) {
        this.aptSkills.push({
          skillId: req.skillId,
          skillName: req.skillName,
          requiredLevel: req.requiredLevel,
          current: empSkill.proficiencyLevel
        });
      } else {
        this.gapSkills.push({
          skillId: req.skillId,
          skillName: req.skillName,
          requiredLevel: req.requiredLevel,
          current: empSkill.proficiencyLevel,
          gap: req.requiredLevel - empSkill.proficiencyLevel
        });
      }
    });
  }
}
