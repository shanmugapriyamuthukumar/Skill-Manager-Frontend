import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
selector:'app-delete-project',
standalone:true,
imports:[FormsModule],
templateUrl:'./delete-project.html'
})
export class DeleteProject{

id:number=0;

constructor(private http:HttpClient){}

deleteProject(){

this.http.delete("http://localhost:9090/api/projects/"+this.id)
.subscribe(()=>{
alert("Project Deleted");
});

}

}