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
import { HTTPService } from './HTTPService.service';

var URLS = {
    photo : BackURL + "/API/event/"
}

@Injectable()
export class PhotosService extends HTTPService {

    constructor(
        public router: Router,
        public http: HttpClient
    ) {
        super(router, http)
     }

    public deletePhoto(id_event : number, id_photo : number): Observable<Object> {
        let headers: HttpHeaders = new HttpHeaders();
        return this.http.delete(URLS.photo + id_event + "/photo?id_photo=" + id_photo, { headers : headers});
    }
}
