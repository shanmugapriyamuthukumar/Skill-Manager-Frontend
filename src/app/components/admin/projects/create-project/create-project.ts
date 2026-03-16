import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
selector:'app-create-project',
standalone:true,
imports:[FormsModule],
templateUrl:'./create-project.html'
})
export class CreateProject{

project:any={};

constructor(private http:HttpClient){}

createProject(){

this.http.post("http://localhost:9090/api/projects",this.project)
.subscribe(()=>{
alert("Project Created");
});

}

}