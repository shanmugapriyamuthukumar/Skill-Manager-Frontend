import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-view-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-projects.html',
  styleUrls: ['./view-projects.scss']
})
export class ViewProjects implements OnInit {

  projects: any[] = [];

  constructor(
    private projectService: ProjectService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("Calling API for projects...");

    this.projectService.getProjects().subscribe({
      next: (res: any) => {
        console.log("API Response:", res);
        this.projects = res || [];
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error("API ERROR:", err);
      }
    });
  }
}