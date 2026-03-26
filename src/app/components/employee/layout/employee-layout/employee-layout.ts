import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],   // ✅ needed for routerLink and router-outlet
  templateUrl: './employee-layout.html',
  styleUrls: ['./employee-layout.css']
})
export class EmployeeLayoutComponent {}
