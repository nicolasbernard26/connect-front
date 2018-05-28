import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router, 
    ) { }

    canActivate() {
        if (localStorage.getItem('profile')) {
            // logged in so return true
            console.log("There is a profile")
            return true;
        }
        this.router.navigate(['/connect/login']);
        return false;
    }
}
