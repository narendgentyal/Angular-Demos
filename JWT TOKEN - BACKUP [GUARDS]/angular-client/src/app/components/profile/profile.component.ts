import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('ngOnInit Called');
    console.log(this.authService.loggedIn());
    this.authService.getProfile().subscribe(data => {
      console.log('Get Profile Called: ' + data);
      this.user = data.user;
    }, err => {
      console.log('Error occured: ' + err.stack);
      return false;
    })
  }

}
