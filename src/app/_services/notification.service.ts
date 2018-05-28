import { Injectable } from '@angular/core';
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
    notification : BackURL + "/API/account/notification"
}

@Injectable()
export class NotificationService extends HTTPService {

    constructor(
        public router: Router,
        public http: HttpClient
    ) { 
        super(router, http);
    }

    public getNotification(): Observable<Object> {        
        const req = new HttpRequest('GET', URLS.notification);
        return this.http.request(req);
    }
}