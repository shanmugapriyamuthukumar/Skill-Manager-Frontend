import { Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard/admin-dashboard';
import { SkillList } from './components/admin/skills/skill-list/skill-list';
import { AddSkillComponent } from './components/admin/skills/add-skill/add-skill.component';

import { EmployeeDashboardComponent } from './components/employee/dashboard/employee-dashboard/employee-dashboard';
import { AddEmployeeSkill } from './components/employee/skills/add-employee-skill/add-employee-skill';
import { PersonalDetails } from './components/employee/profile/personal-details/personal-details';


export const routes:Routes=[

  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},

  {path:'admin/dashboard',component:AdminDashboardComponent},
  {path:'admin/skills',component:SkillList},
  { path: 'admin/add-skill', component: AddSkillComponent },  // ✅ CORRECTED LINE

  {path:'employee/dashboard',component:EmployeeDashboardComponent},
  {path:'employee/skills',component:AddEmployeeSkill},
  {path:'employee/profile',component:PersonalDetails}

];
