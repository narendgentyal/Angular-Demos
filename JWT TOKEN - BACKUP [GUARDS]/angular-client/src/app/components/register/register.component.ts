import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;
  submitted: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    this.submitted = true;
    console.log(this.name);
    let user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    console.log(user.name);
    this.authService.registerUser(user)
      .subscribe(data => {
        alert('User registered');
        console.log(data);
        this.router.navigate(['/login']);
      },
        err => {
          alert('Some Error Occuered');
          console.log(err.stack);
          this.router.navigate(['/register']);
        }
      )
  }
}
