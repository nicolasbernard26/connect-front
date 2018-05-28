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
import { BackURL } from '../../config/url';
import { HTTPService } from './HTTPService.service';

var URLS = {
    connection : BackURL + "/API/account/connections",
    event : BackURL + "/API/account/events",
    profile : BackURL + "/API/account/profile/{0}",
    findConnections : BackURL + "/API/account/profile/find-connections"
}

@Injectable()
export class ProfileService extends HTTPService {

    constructor(
        public router: Router,
        public http: HttpClient
    ) { 
        super(router, http);
    }

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

    public getProfile(id : number) {
        const req = new HttpRequest('GET', this.formatURL(URLS.profile, [id.toString()]));
        return this.http.request(req);
    }

    public findConnections(): Observable<Object> {
        let headers: HttpHeaders = new HttpHeaders();
        return this.http.get(URLS.findConnections, { headers : headers});
    }
}
