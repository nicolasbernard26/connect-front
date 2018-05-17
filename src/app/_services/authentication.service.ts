import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
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
    login : BackURL + "/API/account/login/",
    signUp : BackURL + "/API/account/sign-up/"
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
        //var input = { data : {'username': username, 'password': password}}
        const url = URLS.login;
        return this.http.post(url, input).subscribe(
            data => {
                console.log(data)
                if(data["authenticated"] == "true"){
                    console.log(data)
                    data["profile"]["token"] = "Token " + data["token"]
                    var profile : string = JSON.stringify(data["profile"])
                    localStorage.setItem('profile', profile);
                    this.router.navigate(["/connect/profile/" + data["profile"]["id"]])
                    return true
                }
                return false
            },
            err => {
                console.log(err)
                return false
            }
        );
    }

    public signUp(formData : FormData) {
        var headers: HttpHeaders = new HttpHeaders().append("Enctype", 'multipart/form-data');

        const req = new HttpRequest('POST', URLS.signUp, formData, {
            reportProgress: true,
            headers: headers
        });
        return this.http.request(req);
    }

    public logout(): boolean {
        localStorage.clear();
        return true;
    }

    public getToken() : string{
        this.profile = JSON.parse(localStorage.getItem('profile'));
        return this.profile ? this.profile.token : "";
    }

    public getUsername() : string{
        this.profile = JSON.parse(localStorage.getItem('profile'));
        return String(this.profile.user.username);
    }

    public getId() : number {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        return this.profile.id;
    }
}
