import { Component } from '@angular/core';

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

}