import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // template:'<h1>Hello World </h1>'
})
export class AppComponent //implements OnInit 
{
  title = 'User Management App ..!';
  todaysDate = new Date();

  // ngOnInit() {
  //   this.todaysDate= setInterval( () => { 
  //          this.todaysDate = new Date(); 
  //   }, 1000);
  // }

}
