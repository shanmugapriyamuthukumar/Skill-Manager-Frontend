import { Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { ViewProjects } from './components/admin/projects/view-projects/view-projects';

import { SkillList } from './components/admin/skills/skill-list/skill-list';
import { DeleteSkillComponent } from './components/admin/skills/delete-skill/delete-skill.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard/admin-dashboard';
import { AddSkillComponent } from './components/admin/skills/add-skill/add-skill.component';

import { EmployeeDashboardComponent } from './components/employee/dashboard/employee-dashboard/employee-dashboard';
import { SkillCheckComponent } from './components/employee/skills/skill-check/skill-check';

import { AdminLayoutComponent } from './components/admin/layout/admin-layout/admin-layout.component';
import { EmployeeLayoutComponent } from './components/employee/layout/employee-layout/employee-layout';

export const routes: Routes = [
  // Auth
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Admin routes under layout
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'add-skill', component: AddSkillComponent },
      { path: 'skills', component: SkillList },
      { path: 'delete-skill', component: DeleteSkillComponent },
      { path: 'view-projects', component: ViewProjects }
    ]
  },

  // Employee routes under layout
  {
    path: 'employee',
    component: EmployeeLayoutComponent,
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'skills', component: EmployeeDashboardComponent }, // or your employee skills component
      { path: 'skill-check', component: SkillCheckComponent }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '' }
];
