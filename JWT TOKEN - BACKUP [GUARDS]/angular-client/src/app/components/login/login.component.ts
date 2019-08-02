import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    let user = { email: this.email, password: this.password }

    this.authService.login(user)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/profile']);
      },
        err => {
          console.log(err.stack);
          alert('User not found');
          this.router.navigate(['/login']);
        })
  }

}
