import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../services/toast.service';

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

  newProjectName: string = '';
  selectedSkillId: number = 0;
  requiredLevel: number | null = null;
  newRequiredSkills: RequiredSkill[] = [];

  showAddProjectModal: boolean = false;
  confirmDeleteId: number | null = null;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadSkills();
  }

  // ===== Load Projects =====
  loadProjects(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<Project[]>('http://localhost:9090/projects/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.projects = data;
        this.cd.detectChanges();
      },
      error: () => this.toastService.show('Error loading projects', 'error')
    });
  }

  // ===== Load Skills =====
  loadSkills(): void {
    const token = localStorage.getItem('jwt');
    this.http.get<Skill[]>('http://localhost:9090/skills/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        this.skills = data;
        this.cd.detectChanges();
      },
      error: () => this.toastService.show('Error loading skills', 'error')
    });
  }

  // ===== Modal Controls =====
  openAddProjectModal(): void {
    this.showAddProjectModal = true;
    this.cd.detectChanges();
  }

  closeAddProjectModal(): void {
    this.showAddProjectModal = false;
    this.newProjectName = '';
    this.newRequiredSkills = [];
    this.selectedSkillId = 0;
    this.requiredLevel = null;
    this.cd.detectChanges(); // ✅ ensures modal closes immediately
  }

  // ===== Add Skill to Project =====
  addSkillToProject(): void {
    if (!this.selectedSkillId || !this.requiredLevel) {
      this.toastService.show('Please select a skill and level', 'error');
      return;
    }
    if (this.requiredLevel < 1 || this.requiredLevel > 5) {
      this.toastService.show('Proficiency must be between 1 and 5', 'error');
      return;
    }

    this.newRequiredSkills.push({
      skillId: this.selectedSkillId,
      requiredLevel: this.requiredLevel
    });

    this.selectedSkillId = 0;
    this.requiredLevel = null;
    this.cd.detectChanges();
  }

  // ===== Add Project =====
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

    this.http.post<Project>('http://localhost:9090/projects/add', payload, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (newProject) => {
        this.toastService.show('Project added successfully', 'success');
        this.projects.push(newProject);
        this.cd.detectChanges();
        this.closeAddProjectModal(); // ✅ closes modal immediately
      },
      error: (err) => {
        this.toastService.show(err.error?.error || 'Error adding project', 'error');
      }
    });
  }

  // ===== Delete Confirmation =====
  openDeleteConfirm(id: number): void {
    this.confirmDeleteId = id;
    this.cd.detectChanges();
  }

  closeDeleteConfirm(): void {
    this.confirmDeleteId = null;
    this.cd.detectChanges();
  }

  performDelete(): void {
    if (this.confirmDeleteId !== null) {
      this.deleteProject(this.confirmDeleteId);
      this.confirmDeleteId = null;
    }
  }

  private deleteProject(id: number): void {
    const token = localStorage.getItem('jwt');
    this.http.delete(`http://localhost:9090/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.toastService.show('Project deleted successfully', 'success');
        this.projects = this.projects.filter(p => p.id !== id);
        this.cd.detectChanges();
      },
      error: () => this.toastService.show("Project doesn't exist", 'error')
    });
  }

  // ===== Helper =====
  getSkillName(skillId: number): string {
    const skill = this.skills.find(s => s.id === skillId);
    return skill ? skill.name : `Skill #${skillId}`;
  }
}
