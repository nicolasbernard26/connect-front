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

var URLS = {
    event: BackURL + "/API/event/{0}/",
    photos: BackURL + "/API/event/{0}/photos/",
    entries: BackURL + "/API/event/{0}/entries/",
    create: BackURL + "/API/event/"
}

@Injectable()
export class EventService {

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
    }

    private formatURL(url: string, argument: string[]) {
        for (var k in argument) {
            url = url.replace("{" + k + "}", argument[k])
        }
        return url;
    }

    public getGlobalInformation(id: number): Observable<Object> {
        const req = new HttpRequest('GET', this.formatURL(URLS.event, [id.toString()]));
        return this.http.request(req);
    }

    public createEvent(event: FormData): Observable<Object> {
        var headers: HttpHeaders = new HttpHeaders().append("Enctype", 'multipart/form-data');

        const req = new HttpRequest('POST', URLS.create, event, {
            reportProgress: true,
            headers: headers
        });
        return this.http.request(req);
    }

    public updateEvent(id : number, event: FormData): Observable<Object> {
        var headers: HttpHeaders = new HttpHeaders().append("Enctype", 'multipart/form-data');

        const req = new HttpRequest('UPDATE', this.formatURL(URLS.event, [id.toString()]), event, {
            reportProgress: true,
            headers: headers
        });
        return this.http.request(req);
    }

    public postPhotosEvent(id: number, photos: FormData): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<{}> | HttpUserEvent<{}>> {
        var headers: HttpHeaders = new HttpHeaders().append("Enctype", 'multipart/form-data');

        const req = new HttpRequest('POST', this.formatURL(URLS.photos, [id.toString()]), photos, {
            reportProgress: true,
            headers: headers
        });
        return this.http.request(req);
        //return this.http.post(URLS.event + id + "/setEventPhoto", photo, { headers: headers, reportProgress: true })
    }

    public getPhotos(id: number): Observable<Object> {
        const req = new HttpRequest('GET', this.formatURL(URLS.photos, [id.toString()]));
        return this.http.request(req);
    }

    public getEntries(id: number): Observable<Object> {
        const req = new HttpRequest('GET', this.formatURL(URLS.entries, [id.toString()]));
        return this.http.request(req);
    }

    public addInvolvement(id: number, connectionToAdd: FormData) {
        var headers: HttpHeaders = new HttpHeaders().append("Enctype", 'multipart/form-data');

        const req = new HttpRequest('POST', this.formatURL(URLS.entries, [id.toString()]), connectionToAdd, {
            reportProgress: true,
            headers: headers
        });
        return this.http.request(req);
    }
}
