import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      firstName: ['', [Validators.required
        , Validators.pattern("[A-Z][a-z]{2,14}")]],
      lastName: ['', Validators.required],
      age: ['', [Validators.required,
      Validators.min(20), Validators.max(30)]],
      mobileNumber: ['', [Validators.required,
      Validators.pattern("[6-9][0-9]{9}")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // onSubmit() function
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    console.log(this.addForm.value);
    this.userService.createUser(this.addForm.value)
      .subscribe(data => {
        alert(this.addForm.controls.firstName.value
          + ' record is added successfully ..!');
        this.router.navigate(['list-user']);
      })
  }
}
