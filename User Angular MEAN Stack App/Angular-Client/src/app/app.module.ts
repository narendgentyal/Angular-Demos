import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }
  from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { CalculatorService } from './services/calculator.service';
import { SqrtPipe } from './pipes/sqrt.pipe';
import { NamePipe } from './pipes/name.pipe';
// import {TimeAgoPipe} from 'time-ago-pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    ListUserComponent,
    EditUserComponent,
    LoginComponent,
    SqrtPipe,
    NamePipe,
    // TimeAgoPipe
  ],                        // are part of declarations
  imports: [
    BrowserModule,        // All predefined modules
    AppRoutingModule,     // are part of imports
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  // All user defined services are part of providers
  providers: [UserService, CalculatorService],
  // Startup - Root component
  bootstrap: [AppComponent]
})
export class AppModule { }
