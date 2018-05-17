import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from '../../_services/event.service';
import { ProfileService } from '../../_services/profile.service';
import { AuthenticationService } from '../../_services/authentication.service';

import { PhotoEvent } from '../../_models/photo_event/photo_event';
import { PhotoEventJson } from '../../_models/photo_event/photo_event_json';
import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../_services/error.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { Event } from '@angular/router/src/events';
import { PhotosService } from '../../_services/photos.service';

@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

	public id: number;
	public photosEvent: PhotoEvent[] = [];
	public photosEventPaginated: { photos: PhotoEvent[], page: number }[] = []
	public displayModal: boolean = false;

	public pages: number[] = [1];
	public currentPage: number = 1;

	constructor(
		private route: ActivatedRoute,
		private eventService: EventService,
		public authenticationService: AuthenticationService,
		private errorService: ErrorService,
		private photoService: PhotosService
	) { }

	ngOnInit() {
		this.id = +this.route.snapshot.paramMap.get('id');
		this.eventService.getPhotos(this.id).subscribe(
			(event: HttpEvent<any>) => {
				this.dealWithHttpEvent(event);
			},
			(err: HttpErrorResponse) => {
				this.errorService.dealWithHttpErrorResponse(err);
			}
		)
	}

	private dealWithHttpEvent(event: HttpEvent<any>) {
		switch (event.type) {
			case HttpEventType.Sent:
				console.log('Request sent!');
				break;
			case HttpEventType.Response:
				var photo: PhotoEventJson
				if (event.body["photos"] != undefined) {
					for (photo of event.body["photos"]) {
						this.photosEvent.push(new PhotoEvent(photo));
					}
					var page = Math.floor(this.photosEvent.length / 20);
					if (page >= 0) {
						for (var i = 1; i <= page + 1; i++) {
							this.photosEventPaginated.push({ photos: this.photosEvent.splice(0, (19 < this.photosEvent.length) ? 19 : this.photosEvent.length), page: i });
						}
					}
					this.pages = Array.apply(null, { length: page + 1 }).map(Number.call, Number);
					this.pages.forEach(function (part, index, theArray) {
						theArray[index] = part + 1;
					});
				}
		}
	}

	public onPrevious() {
		this.currentPage--;
	}

	public onNext() {
		this.currentPage++;
	}

	public goTo(number) {
		this.currentPage = number;
	}
}