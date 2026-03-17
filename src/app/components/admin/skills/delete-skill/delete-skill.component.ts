import { Component } from '@angular/core';
import { SkillService } from '../../../../services/skill.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-skill',
  imports: [FormsModule],
  templateUrl: './delete-skill.html',
  styleUrls: ['./delete-skill.scss']
})
export class DeleteSkillComponent {

  skillId!: number;

  constructor(private skillService: SkillService) {}

  deleteSkill() {
    if (!this.skillId) {
      alert("Please enter Skill ID");
      return;
    }

    if (!confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    this.skillService.deleteSkill(this.skillId).subscribe({
      next: () => {
        alert("Skill deleted successfully!");
        this.skillId = 0;  // Reset input
      },
      error: (err) => {
        console.error(err);
        alert("Error deleting skill or skill does not exist.");
      }
    });
  }
}