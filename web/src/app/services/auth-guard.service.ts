import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user-service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate() {
        if (this.userService.isLoggedIn()) {
            // logged in so return true
            return true;
        }
        
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}