import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  projectName: string;
}

interface Employee {
  id: number;
  name: string;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './report.html',
  styleUrls: ['./report.css']
})
export class ReportComponent implements OnInit {
  projects: Project[] = [];
  expandedProjectId: number | null = null;
  qualifiedEmployees: Employee[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProjects();
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
        this.cd.detectChanges();
      }
    });
  }

  checkProject(project: Project): void {
    this.expandedProjectId = project.id;
    this.qualifiedEmployees = [];
    this.loading = true;
    this.cd.detectChanges();

    const token = localStorage.getItem('jwt');
    this.http.get<any[]>(`http://localhost:9090/projects/${project.id}/qualified-employees`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => {
        // normalize response in case backend uses different field names
        this.qualifiedEmployees = data.map(emp => ({
          id: emp.id ?? emp.employeeId,
          name: emp.name ?? emp.employeeName
        }));
        this.loading = false;
        this.cd.detectChanges();
      },
      error: err => {
        console.error('Error fetching qualified employees:', err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  closeCheck(): void {
    this.expandedProjectId = null;
    this.qualifiedEmployees = [];
    this.loading = false;
    this.cd.detectChanges();
  }
}
