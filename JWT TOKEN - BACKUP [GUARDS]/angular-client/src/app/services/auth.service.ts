import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }
  // for logOut to disappear incase, if you didnt login yet
  isUserLoggedIn = false;
  loggedIn() {
    return this.isUserLoggedIn;
  }

  // Register User
  registerUser(user) {
    console.log('Received: ' + user);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers });
  }

  // Authenticate User
  login(user) {
    console.log('Received: ' + user);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/login', user, { headers: headers })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(user);
        this.isUserLoggedIn = true;
        if (user && user.token) {
          this.storeUserDate(user.token, user);
        }
        return user;
      }));
  }

  // Store token and user details inside browser under localStorage
  storeUserDate(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // logOut() function
  logOut() {
    this.isUserLoggedIn = false;
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // getProfile()
  getProfile() {
    console.log('getProfile from Service called');
    let headers = new HttpHeaders({
      "Authorization": this.authToken,
      'Content-Type': 'application/json'
    });
    this.loadToken();
    console.log('Token Set: ' + this.authToken);
    return this.http.get('http://localhost:3000/users/profile', { headers: headers });
  }

  // loadToken()
  loadToken() {
    const token = localStorage.getItem('id_token');
    console.log('Token Received: ' + token);
    this.authToken = token;
  }
}

