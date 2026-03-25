import { Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { CreateProjectComponent } from './components/admin/projects/create-project/create-project';
import { DeleteProjectComponent } from './components/admin/projects/delete-project/delete-project';
import { ViewProjects } from './components/admin/projects/view-projects/view-projects';

import { SkillList } from './components/admin/skills/skill-list/skill-list';
import { DeleteSkillComponent } from './components/admin/skills/delete-skill/delete-skill.component';;
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard/admin-dashboard';
import { AddSkillComponent } from './components/admin/skills/add-skill/add-skill.component';

import { EmployeeDashboardComponent } from './components/employee/dashboard/employee-dashboard/employee-dashboard';
import { SkillCheckComponent } from './components/employee/skills/skill-check/skill-check';

export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/add-skill', component: AddSkillComponent },
  { path: 'admin/skills', component: SkillList },
  { path: 'admin/delete-skill', component: DeleteSkillComponent },
  
  { path: 'admin/create-project', component: CreateProjectComponent},
  { path: 'admin/delete-project', component: DeleteProjectComponent},
  { path: 'admin/view-projects', component: ViewProjects },


  {path:'employee/dashboard',component:EmployeeDashboardComponent},
  {path:'employee/skills',component:SkillCheckComponent},

];