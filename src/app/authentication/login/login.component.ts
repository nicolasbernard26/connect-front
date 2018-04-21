import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { AuthenticationService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: {
        username : string,
        password : string
    } = {
        username : "",
        password: ""
    };

    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.authenticationService.login(this.model.username, this.model.password)
    }

    analyseError(error: any) {
        console.log(error);
        if (error.status == 200) {
            console.log(this.authenticationService.getId())
            this.router.navigate(['/connect/profile/' + this.authenticationService.getId()]);
        } else {
            this.router.navigate(['/connect/login']);
        }
    }
}
