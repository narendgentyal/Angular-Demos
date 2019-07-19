import { Component, OnInit } from '@angular/core';

@Component({
  
  selector: 'app-home',
  // template:'<h1>Welcome to Aboutus page </h1>',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  // styles:[]
})
export class HomeComponent implements OnInit {
 title:string= "welcome to angular 6";
  
  // json data
  cust = {
    name:'Mukund',
    age:25,
    address:{
      city:'Bangalore',
      state:'Karnataka'
    }
  };
  // Array data
  months = ["Jan","Feb","Mar","Apr","May","Jun",
"Jul","Aug","Sep","Oct","Nov","Dec"];

 
  submitted:boolean = true;
 
   // date
   todaysDate = new Date();
 
  constructor() { }

  ngOnInit() {
  }

}
