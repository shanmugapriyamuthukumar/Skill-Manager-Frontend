import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../../../../services/skill.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-skill',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.css']
})
export class AddSkillComponent {

  name: string = '';
  category: string = '';

  // ✅ NEW (like login/signup)
  isLoading: boolean = false;

  constructor(private skillService: SkillService) {}

  submitSkill() {

    // ✅ Validation
    if (!this.name || !this.name.trim()) {
      alert("Skill name is required");
      return;
    }

    const payload = {
      name: this.name.trim(),
      category: this.category?.trim() || ''
    };

    this.isLoading = true; // start loader

    this.skillService.addSkill(payload).subscribe({
      next: (res) => {

        this.isLoading = false;

        alert("Skill added successfully!");

        // ✅ reset form
        this.name = '';
        this.category = '';
      },

      error: (err) => {

        this.isLoading = false;

        console.error("Backend Error:", err);

        alert(err?.error?.message || "Error adding skill");
      }
    });
  }
}