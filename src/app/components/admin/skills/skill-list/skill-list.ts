import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../services/toast.service';

interface Skill {
  id: number;
  name: string;
  category: string;
}

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './skill-list.html',
  styleUrls: ['./skill-list.css']
})
export class SkillList implements OnInit {
  skills: Skill[] = [];

  // form inputs
  newSkillName: string = '';
  newSkillCategory: string = '';

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadSkills();
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

  addSkill(): void {
    if (!this.newSkillName || !this.newSkillCategory) {
      this.toastService.show('Please enter both name and category', 'error');
      return;
    }

    const token = localStorage.getItem('jwt');
    const payload = { name: this.newSkillName, category: this.newSkillCategory };

    this.http.post('http://localhost:9090/skills/add', payload, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    }).subscribe({
      next: (resp) => {
        this.toastService.show('Skill added successfully', 'success');
        this.newSkillName = '';
        this.newSkillCategory = '';
        this.loadSkills(); // refresh list
      },
      error: (err) => {
        console.error(err);
        this.toastService.show(err.error?.error || 'Error adding skill', 'error');
      }
    });
  }

  deleteSkill(id: number): void {
    const token = localStorage.getItem('jwt');
    this.http.delete(`http://localhost:9090/skills/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    }).subscribe({
      next: (resp) => {
        this.toastService.show('Skill deleted successfully', 'success');
        this.loadSkills(); // refresh list
      },
      error: (err) => {
        console.error(err);
        this.toastService.show("Skill doesn't exist", 'error');
      }
    });
  }
}
