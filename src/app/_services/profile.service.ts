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
import { BackURL } from '../../config/url';

var URLS = {
    connection : BackURL + "/API/account/connections/",
    event : BackURL + "/API/account/events/",
    profile : BackURL + "/API/account/profile/"
}

@Injectable()
export class ProfileService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    public getConnection(): Observable<Object> {
        let headers: HttpHeaders = new HttpHeaders();
        return this.http.get(URLS.connection, { headers : headers});
    }

    public getEvents(token : string): Observable<Object> {
        let headers: HttpHeaders = new HttpHeaders();
        console.log(token)
        headers = headers.append('Authorization', token);
        return this.http.get(URLS.event, { headers : headers});
    }

    public getProfile(id : number, token : string) {
        let headers: HttpHeaders = new HttpHeaders();
        console.log(token)
        headers = headers.append('Authorization', token);
        return this.http.get(URLS.profile + id, { headers : headers})
    }
}
