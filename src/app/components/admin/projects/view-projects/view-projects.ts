import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../services/toast.service'; // adjust path if needed

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
  requiredLevel: number | null = null;
  newRequiredSkills: RequiredSkill[] = [];

  // qualified employees
  qualifiedEmployees: Employee[] = [];
  selectedProjectId: number | null = null;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    public toastService: ToastService
  ) {}

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
      error: err => {
        console.error('Error loading projects:', err);
        this.toastService.show('Error loading projects', 'error');
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
        console.error('Error loading skills:', err);
        this.toastService.show('Error loading skills', 'error');
      }
    });
  }

  addSkillToProject(): void {
    if (!this.selectedSkillId || !this.requiredLevel) {
      this.toastService.show('Please select a skill and level', 'error');
      return;
    }

    // ✅ Validate proficiency range
    if (this.requiredLevel < 1 || this.requiredLevel > 5) {
      this.toastService.show('Proficiency must be between 1 and 5', 'error');
      return;
    }

    this.newRequiredSkills.push({
      skillId: this.selectedSkillId,
      requiredLevel: this.requiredLevel
    });

    this.selectedSkillId = 0;
    this.requiredLevel = 1;
    this.toastService.show('Skill added to project requirements', 'success');
  }


  addProject(): void {
    if (!this.newProjectName || this.newRequiredSkills.length === 0) {
      this.toastService.show('Please enter project name and at least one required skill', 'error');
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
      next: () => {
        this.toastService.show('Project added successfully', 'success');
        this.newProjectName = '';
        this.newRequiredSkills = [];
        this.loadProjects(); // refresh list
      },
      error: (err) => {
        console.error(err);
        this.toastService.show(err.error?.error || 'Error adding project', 'error');
      }
    });
  }

  deleteProject(id: number): void {
    const token = localStorage.getItem('jwt');
    this.http.delete(`http://localhost:9090/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.toastService.show('Project deleted successfully', 'success');
        this.loadProjects(); // refresh list
      },
      error: (err) => {
        console.error(err);
        this.toastService.show("Project doesn't exist", 'error');
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
        this.toastService.show('Qualified employees loaded', 'success');
      },
      error: err => {
        console.error('Error checking project:', err);
        this.toastService.show('Error checking project', 'error');
      }
    });
  }
}
