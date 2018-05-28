import { Component, OnInit } from '@angular/core';
import { useAnimation } from '@angular/animations/src/animation_metadata';
import { Profile } from '../../_models/profile/profile';
import { NotificationService } from '../../_services/notification.service';
import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../_services/error.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	public profile : Profile;

	constructor(
		private auth : AuthenticationService,
		private notificationService: NotificationService,
		private errorService: ErrorService
	) {}

	ngOnInit() {
		console.log("ngOnInit")
		this.profile = JSON.parse(localStorage.getItem('profile'));
		function notificationFunction() {
			this.getNotifications();
		}
		setInterval(notificationFunction.bind(this), 10000)
	}

	private openNav() {
		console.log("Open Nav")
		document.getElementById("mySidenav").style.width = "250px";
	}
	
	private closeNav() {
		console.log("Close nav");
		document.getElementById("mySidenav").style.width = "0";
	}

	private getNotifications(){
		this.notificationService.getNotification().subscribe(
			(event: HttpEvent<any>) => {
				console.log(event)
                switch (event.type) {
                    case HttpEventType.Response:        
                        console.log(event.body);
                }
            },
            (err: HttpErrorResponse) => {
                this.errorService.dealWithHttpErrorResponse(err);
            }
		)
	}
}
