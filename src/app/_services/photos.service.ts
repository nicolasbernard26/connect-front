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
    photo : BackURL + "/API/event/"
}

@Injectable()
export class PhotosService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    public deletePhoto(token : string, id : number): Observable<Object> {
        let headers: HttpHeaders = new HttpHeaders();
        console.log(token)
        headers = headers.append('Authorization', token);
        return this.http.delete(URLS.photo + id + "/photos/photo", { headers : headers});
    }
}
