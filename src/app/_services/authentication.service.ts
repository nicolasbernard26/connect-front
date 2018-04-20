import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';

import { Profile } from '../_models/profile/profile'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subscription } from 'rxjs/Subscription';

import { ProfileService } from '../_services/profile.service';

import { ProfileJson } from '../_models/profile/profile_json';
import { BackURL } from '../../config/url';

var URLS = {
    login : BackURL + "/API/account/login/"
}

@Injectable()
export class AuthenticationService {

    private profile : ProfileJson;

    constructor(
        private router: Router,
        private http: HttpClient, 
        private profileService : ProfileService

    ) {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }

    public login(username: string, password: string) : Subscription {
        let input = new FormData();
		input.append('username', username);
		input.append('password', password);
        const url = URLS.login;
        return this.http.post(url, input).subscribe(
            data => {
                this.router.navigate(['/']);
                if(data["authenticated"] == "true"){
                    data["profile"]["token"] = "Token " + data["token"]
                    var profile : string = JSON.stringify(data["profile"])
                    localStorage.setItem('profile', profile);
                    this.router.navigate(["/profile/" + data["profile"]["id"] + "/home"])
                    return true
                }
                return false
            },
            err => {
                return false
            }
        );
    }

    public logout(): boolean {
        localStorage.clear();
        return true;
    }

    public getToken() : string{
        return this.profile ? this.profile.token : "";
    }

    public getUsername() : string{
        return String(this.profile.user.username);
    }

    public getId() : number {
        return this.profile.id;
    }
}
