import { Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { CreateProjectComponent } from './components/admin/projects/create-project/create-project';

import { SkillList } from './components/admin/skills/skill-list/skill-list';
import { DeleteSkillComponent } from './components/admin/skills/delete-skill/delete-skill.component';;
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard/admin-dashboard';
import { AddSkillComponent } from './components/admin/skills/add-skill/add-skill.component';

import { EmployeeDashboardComponent } from './components/employee/dashboard/employee-dashboard/employee-dashboard';
import { AddEmployeeSkillComponent } from './components/employee/skills/add-employee-skill/add-employee-skill';
import { UpdateEmployeeSkillComponent } from './components/employee/skills/update-employee-skill/update-employee-skill';
import { PersonalDetails } from './components/employee/profile/personal-details/personal-details';

export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'admin/create-project', component: CreateProjectComponent},
  { path: 'signup', component: SignupComponent },

  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/add-skill', component: AddSkillComponent },
  
  { path: 'admin/skills', component: SkillList },

  { path: 'admin/delete-skill', component: DeleteSkillComponent },

  {path:'employee/dashboard',component:EmployeeDashboardComponent},
  {path:'employee/skills/add',component:AddEmployeeSkillComponent},
  {path:'employee/skills/update',component:UpdateEmployeeSkillComponent},
  {path:'employee/profile',component:PersonalDetails}

];