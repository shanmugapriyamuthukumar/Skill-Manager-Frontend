import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
selector:'app-update-project',
standalone:true,
imports:[FormsModule],
templateUrl:'./update-project.html'
})
export class UpdateProject{

project:any={};

constructor(private http:HttpClient){}

updateProject(){

this.http.put("http://localhost:9090/api/projects/"+this.project.id,this.project)
.subscribe(()=>{
alert("Project Updated");
});

}

}