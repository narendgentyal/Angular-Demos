import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.loggedIn() || localStorage.getItem('user')) {
            console.log('IF canActivate');
            return true;
        }

        console.log('canActivate');
        this.router.navigate['/login'];
        return false;

    }
}