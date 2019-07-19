import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } 
from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Instance Variables - 
  // Bydefault public in Typescript
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;


 // Constructor Dependency Injection
  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

// initializing default values to textboxes
// and configuring validations
    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });

  // applying multiple validations
      // password: ['', [Validators.required, 
      //   Validators.min(18)]],
    }

    // this code will be executed on click of login btn
    onSubmit() {
      this.submitted = true;
      // If validation failed, it should return 
      // to Validate again
      if (this.loginForm.invalid) {
        return;
      }


      let username
        = this.loginForm.controls.email.value;
        let password
        = this.loginForm.controls.password.value;

     if (username
        == "admin@gmail.com" &&
    password == "123456") 
    {
        localStorage.setItem("username", username);
        // localStorage.setItem("password", password);
        this.router.navigate(['list-user']);
      }
      else {
        this.invalidLogin = true;
      }
    }
}
