import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SkillService } from '../../../../services/skill.service';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-list.html',
  styleUrls: ['./skill-list.css']
})
export class SkillList implements OnInit {

  skills: any = [];

  constructor(private skillService: SkillService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log("Calling API for skills...");

    this.skillService.getSkills().subscribe(
      (res: any) => {
        console.log("API Response:", res);
        this.skills = res;
		this.cd.detectChanges();
      },
      (err: any) => {
        console.error("API ERROR:", err);
      }
    );
  }
}