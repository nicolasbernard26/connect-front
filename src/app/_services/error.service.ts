import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';

import { EventJson } from '../_models/event/event_json';
import { Profile } from '../_models/profile/profile'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ErrorService {

    constructor(
        private router: Router,
    ) {
    }

    public dealWithHttpErrorResponse(err : HttpErrorResponse){
		if (err.error instanceof Error) {
			console.log("Client-side error occured.");
		} else {
			console.log("Server-side error occured.");
		}
	}
}
