import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../../../services/skill.service';

@Component({
  selector: 'app-delete-skill',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">

      <h2>Delete Skill</h2>

      <p>Are you sure you want to delete Skill ID: {{ id }}?</p>

      <button class="btn btn-danger" (click)="delete()">Delete</button>
      <button class="btn btn-secondary" (click)="cancel()">Cancel</button>

    </div>
  `
})
export class DeleteSkillComponent implements OnInit {

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  delete() {
    this.skillService.deleteSkill(this.id).subscribe(() => {
      alert("Skill deleted successfully!");
      this.router.navigate(['/admin/skills']);
    });
  }

  cancel() {
    this.router.navigate(['/admin/skills']);
  }
}