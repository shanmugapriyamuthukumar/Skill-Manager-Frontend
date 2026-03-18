import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-skill',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './delete-skill.html',
  styleUrls: ['./delete-skill.scss']
})
export class DeleteSkillComponent {

  skillId: number = 0;   // <-- THIS FIXES YOUR ERROR

  constructor(private http: HttpClient) {}

  deleteSkill() {
    this.http.delete("http://localhost:9090/skills/delete/" + this.skillId,
      { responseType: 'text' }
    ).subscribe({
      next: (resp) => {
        alert(resp);
      },
      error: (err) => {
        console.error(err);
        alert("Skill Doesn't Exist");
      }
    });
  }
}