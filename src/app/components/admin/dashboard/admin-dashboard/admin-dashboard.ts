import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent {
  skillRequests = [
    { skill: 'Angular', count: 4 },
    { skill: 'Spring Boot', count: 3 },
    { skill: 'Python', count: 2 }
  ];

  projectRequests = [
    { project: 'Project Delta', skill: 'Angular Developer' },
    { project: 'Project Nova', skill: 'SQL Expert' }
  ];

  constructor(private router: Router) {}

  goToProjects(): void {
    this.router.navigate(['/admin/view-projects']); // adjust route path to your projects tab
  }

  goToSkills(): void {
    this.router.navigate(['/admin/skills']); // adjust route path to your skills tab
  }
}
