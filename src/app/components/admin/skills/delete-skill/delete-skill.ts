import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
selector:'app-delete-skill',
standalone:true,
imports:[FormsModule],
templateUrl:'./delete-skill.html'
})
export class DeleteSkill{

id:number=0;

constructor(private http:HttpClient){}

deleteSkill(){

this.http.delete("http://localhost:9090/api/skills/"+this.id)
.subscribe(()=>{
alert("Skill Deleted");
});

}

}