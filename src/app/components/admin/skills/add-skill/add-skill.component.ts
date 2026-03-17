import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../../../../services/skill.service';

@Component({
  selector: 'app-add-skill',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.css']
})
export class AddSkillComponent {

  name: string = '';
  category: string = '';

  constructor(private skillService: SkillService) {}

  submitSkill() {
    if (!this.name.trim()) {
      alert("Skill name is required");
      return;
    }

    const payload = {
      name: this.name,
      category: this.category
    };

    this.skillService.addSkill(payload).subscribe({
      next: (res) => {
        alert("Skill added successfully!");
        this.name = '';
        this.category = '';
      },
      error: (err) => {
        console.error("Backend Error:", err);
        alert(err.error?.message || "Error adding skill");
      }
    });
  }
}