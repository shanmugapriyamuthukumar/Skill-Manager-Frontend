import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
selector:'app-add-skill',
standalone:true,
imports:[FormsModule],
templateUrl:'./add-skill.html'
})
export class AddSkill{

skill:any={};

constructor(private http:HttpClient){}

addSkill(){

this.http.post("http://localhost:9090/api/skills",this.skill)
.subscribe(()=>{
alert("Skill Added");
});

}

}