import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Component, Directive, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HttpClient, HttpResponse, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';

import { ProfileService } from '../_services/profile.service';

import { TabComponent } from '../_component/tab.component';
import { OnDestroy, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from '../_services/index';
import { Profile } from '../_models/profile/profile';
import { ErrorService } from '../_services/error.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
@Directive({ selector: '[mySpy]' })
export class ProfileComponent implements OnInit {

    form: FormGroup;
    loading: boolean = false;
    private id: number;
    private textView;
    public profile: Profile;
    public connectionsToAdd: Profile[] = [];
    public authorizationError : boolean = false;
    public authorizationErrorMessage : string = "";

    @ViewChild('fileInput') fileInput: ElementRef;


    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private profileService: ProfileService,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private errorService: ErrorService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            val => {
                this.initializeComponent();
                this.profileService.getProfile(this.id).subscribe(
                    (event: HttpEvent<any>) => {
                        this.dealWithHttpEvent(event);
                    },
                    (err: HttpErrorResponse) => {
                        this.errorService.dealWithHttpErrorResponse(err);
                    }
                    /*data => {
                        console.log(data)
                        this.profile = new Profile(data["profile"], data["relation"]);
                        if(data["profile_to_add"]){
                            data["profile_to_add"].forEach(element => {
                                this.connectionsToAdd.push(new Profile(element, "non_connection"));
                            });
                        }
                    },
                    err => {
                        console.log(err)
                    }*/
                );
            }
        )
    }

    private initializeComponent() {
        this.profile = null;
        this.connectionsToAdd = [];
        this.id = +this.route.snapshot.paramMap.get('id');
        window.scrollTo(0, 0);
    }

    private dealWithHttpEvent(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent:
                console.log('Request sent!');
                break;
            case HttpEventType.Response:

                if (event.body['error'] == "You are not authorized") {
                    this.authorizationError = true;
                    this.authorizationErrorMessage = event.body['error'];
                    return
                }
                this.profile = new Profile(event.body["profile"], event.body["relation"]);
                if (event.body["profile_to_add"]) {
                    event.body["profile_to_add"].forEach(element => {
                        this.connectionsToAdd.push(new Profile(element, "non_connection"));
                    });
                }
        }
    }
}
