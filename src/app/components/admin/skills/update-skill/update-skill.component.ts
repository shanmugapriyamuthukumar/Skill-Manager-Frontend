import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../../../services/skill.service';

@Component({
  selector: 'app-update-skill',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.css']
})
export class UpdateSkillComponent implements OnInit {

  id!: number;
  name: string = '';
  category: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSkill();
  }

  loadSkill() {
    this.skillService.getSkills().subscribe((res: any) => {

      const skills: any[] = res;
      const found = skills.find(s => s.id === this.id);

      if (found) {
        this.name = found.name;
        this.category = found.category;
      }
    });
  }

  updateSkill() {

    const payload = {
      name: this.name,
      category: this.category
    };

    this.skillService.updateSkill(this.id, payload).subscribe(
      () => {
        alert("Skill updated successfully!");
        this.router.navigate(['/admin/skills']);
      },
      (err: any) => {
        console.error(err);
        alert("Update failed");
      }
    );
  }
}