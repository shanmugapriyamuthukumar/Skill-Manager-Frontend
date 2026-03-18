export interface ProjectSkill {
  skillName: string;
  proficiency: string;
}

export interface Project {
  projectId?: number;   // auto generated
  projectName: string;
  requiredSkills: ProjectSkill[];
}