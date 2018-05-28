import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';

import { EventJson } from '../_models/event/event_json';
import { Profile } from '../_models/profile/profile'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { catchError, tap, map, last } from 'rxjs/operators';
import { HttpRequest } from '@angular/common/http';
import { HttpSentEvent } from '@angular/common/http';
import { HttpHeaderResponse } from '@angular/common/http';
import { HttpProgressEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpUserEvent } from '@angular/common/http';

import { BackURL } from '../../config/url';
import { HTTPService } from './HTTPService.service';

var URLS = {
    addConnection: BackURL + "/API/account/connection",
}

@Injectable()
export class ConnectionService extends HTTPService {

    constructor(
        public router: Router,
        public http: HttpClient,
    ) {
        super(router, http)
    }

    public addConnection(id : number){
        const req = new HttpRequest('POST', URLS.addConnection, {id_other_profile : id});
        return this.http.request(req);
    }

}