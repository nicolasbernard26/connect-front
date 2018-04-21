import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from '../_services/event.service';
import { ProfileService } from '../_services/profile.service';
import { AuthenticationService } from '../_services/authentication.service';

import { PhotoEvent } from '../_models/photo_event/photo_event';
import { Event } from '../_models/event/event';
import { TabComponent } from '../_component/tab.component';
import { HttpEvent } from '@angular/common/http/src/response';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ErrorService } from '../_services/error.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent extends TabComponent implements OnInit {

    private id: number;
    public event: Event = null;
    public admin: boolean = false;
    public selectedTab: string;
    public authorizationError : boolean = false;

    constructor(
        private route: ActivatedRoute,
        private eventService: EventService,
        public authenticationService: AuthenticationService,
        private errorService: ErrorService
    ) {
        super();
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.route.params.subscribe(
            val => {
                console.log(val);
                if(val.id != this.id) {
                    this.id = val.id;
                    this.eventService.getGlobalInformation(this.id).subscribe(
                        (event: HttpEvent<any>) => {
                            this.dealWithHttpEvent(event);
                        },
                        (err: HttpErrorResponse) => {
                            this.errorService.dealWithHttpErrorResponse(err);
                        }
                    )
                }
                this.selectedTab = val.selectedTab;
                //window.scrollTo(0, 0);
            }
        )
    }

    private dealWithHttpEvent(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent:
                console.log('Request sent!');
                break;
            case HttpEventType.Response:
                this.event = new Event();
                console.log(event.body)
                if(event.body['error'] == "You are not authorized"){
					this.authorizationError = true;
					return
				}
                this.event.initializeFromJson(event.body["event"]);
                this.admin = this.event.admin.user.username == this.authenticationService.getUsername();
                console.log(this.event);
        }
    }

    public myStyle(): object {
        return { "background-image": "url(\"" + this.event.photo_event + "\")" };
    }
}