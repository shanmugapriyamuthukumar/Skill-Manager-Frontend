import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
selector:'app-view-projects',
standalone:true,
templateUrl:'./view-projects.html'
})
export class ViewProjects{

projects:any[]=[];

constructor(private http:HttpClient){}

ngOnInit(){

this.http.get("http://localhost:9090/api/projects")
.subscribe((data:any)=>{
this.projects=data;
});

}

}