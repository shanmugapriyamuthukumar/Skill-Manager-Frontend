import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RequiredSkill {
  skillId: number;
  requiredLevel: number;
}

interface Project {
  id: number;
  projectName: string;
  requiredSkills: RequiredSkill[];
}

interface Skill {
  id: number;
  name: string;
  category: string;
}

interface Employee {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-view-projects',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './view-projects.html',
  styleUrls: ['./view-projects.css']
})
export class ViewProjects implements OnInit {
  projects: Project[] = [];
  skills: Skill[] = [];

  // form inputs
  newProjectName: string = '';
  selectedSkillId: number = 0;
  requiredLevel: number |null = null;
  newRequiredSkills: RequiredSkill[] = [];

  // qualified employees
  qualifiedEmployees: Employee[] = [];
  selectedProjectId: number | null = null;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadSkills();
  }

  loadProjects(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<Project[]>('http://localhost:9090/projects/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.projects = data;
        this.cd.detectChanges();
      },
      error: err => console.error('Error loading projects:', err)
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
      error: err => console.error('Error loading skills:', err)
    });
  }

  addSkillToProject(): void {
    if (!this.selectedSkillId || !this.requiredLevel) {
      alert('Please select a skill and level');
      return;
    }
    this.newRequiredSkills.push({
      skillId: this.selectedSkillId,
      requiredLevel: this.requiredLevel
    });
    this.selectedSkillId = 0;
    this.requiredLevel = 1;
  }

  addProject(): void {
    if (!this.newProjectName || this.newRequiredSkills.length === 0) {
      alert('Please enter project name and at least one required skill');
      return;
    }

    const token = localStorage.getItem('jwt');
    const payload = {
      projectName: this.newProjectName,
      requiredSkills: this.newRequiredSkills
    };

    this.http.post('http://localhost:9090/projects/add', payload, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    }).subscribe({
      next: (resp) => {
        alert(resp);
        this.newProjectName = '';
        this.newRequiredSkills = [];
        this.loadProjects(); // refresh list
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.error || 'Error adding project');
      }
    });
  }

  deleteProject(id: number): void {
    const token = localStorage.getItem('jwt');
    this.http.delete(`http://localhost:9090/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    }).subscribe({
      next: (resp) => {
        alert(resp);
        this.loadProjects(); // refresh list
      },
      error: (err) => {
        console.error(err);
        alert("Project Doesn't Exist");
      }
    });
  }

  // ✅ Helper to get skill name by ID
  getSkillName(skillId: number): string {
    const skill = this.skills.find(s => s.id === skillId);
    return skill ? skill.name : `Skill #${skillId}`;
  }

  // ✅ Check project for qualified employees
  checkProject(id: number): void {
    const token = localStorage.getItem('jwt');
    this.http.get<Employee[]>(`http://localhost:9090/projects/${id}/qualified-employees`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.selectedProjectId = id;
        this.qualifiedEmployees = data;
        this.cd.detectChanges();
      },
      error: err => console.error('Error checking project:', err)
    });
  }
}
