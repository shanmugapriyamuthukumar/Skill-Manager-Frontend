import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-projects.html'
})
export class ViewProjects {

  projects: any[] = [];

}