import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  submitted: boolean = false;
  user: User;
  userId: string;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.route.params.subscribe
      (params => this.userId = params['id']);
    console.log(this.userId);
  }

  // LogOff User
  logOutUser() {
    if (localStorage.getItem("username") != null) {
      localStorage.removeItem("username");
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    // if(localStorage.getItem("username")!=null){
    //   let userId = localStorage.getItem("editUserId");
    if (this.userId != null) {
      if (!this.userId) {
        alert('Invalid Action');
        this.router.navigate(['list-user']);
        return;
      }
      this.editForm = this.formBuilder.group({
        _id: [this.userId],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', [Validators.required,
        Validators.min(20), Validators.max(30)]],
        mobileNumber: ['', [Validators.required,
        Validators.pattern("[6-9][0-9]{9}")]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });

      // pulling data from database or json-server
      //  using service
      // this.userService.getUsersById(+userId)
      this.userService.getUsersById(this.userId)
        .subscribe(data => {
          this.editForm.setValue(data)
          console.log(data);
        });
    }
    else {
      this.router.navigate(['/login']);
    }
  } // end of ngOnInit() function

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

    this.userService.updateUser(this.editForm.value)
      // .pipe(first())
      .subscribe(data => {
        this.router.navigate(['list-user']);
      }, error => {
        alert(error);
      });
  }
}
