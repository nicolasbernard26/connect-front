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
	public displayModal: boolean = false;
	public photoModal: PhotoEvent = null;
	public displayPopin: boolean = false;
	public photoToDelete: PhotoEvent = null;

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

	public allowDrop(e: DragEvent) {
		console.log("allowDrop")
		e.preventDefault();
	}

	public startDragPhoto(e: DragEvent) {
		console.log("startDragPhoto")
		e.dataTransfer.setData("text", "salut");
	}

	public onDropPhoto(e: DragEvent) {
		//console.log("onDropPhoto")
		e.preventDefault();
		console.log(e.dataTransfer.getData("text"));
	}

	public dragPhoto(e: DragEvent) {
		console.log("dragPhoto");
		e.preventDefault();
	}

	public retrieveModal() {
		this.photoModal = null;
	}

	public showModal(photo: PhotoEvent) {
		this.photoModal = photo;
	}

	public next(photo: PhotoEvent, i: number) {
		var index = this.photosEvent.findIndex(function (element) {
			return element === photo;
		});
		console.log(index);
		this.photoModal = this.photosEvent[index + i];
	}

	private dealWithHttpEvent(event: HttpEvent<any>) {
		switch (event.type) {
			case HttpEventType.Sent:
				console.log('Request sent!');
				break;
			case HttpEventType.Response:
				var photo: PhotoEventJson
				if (event.body["photos"] != undefined) {
					console.log(event.body["photos"])
					for (photo of event.body["photos"]) {
						this.photosEvent.push(new PhotoEvent(photo));
					}
				}
		}
	}


	private dealWithHttpEventAfterDeletePhoto(event: HttpEvent<any>) {
		switch (event.type) {
			case HttpEventType.Sent:
				console.log('Request sent!');
				break;
			case HttpEventType.Response:
				var photo: PhotoEventJson
				console.log(event.body)
		}
	}

	public deletePhoto(photo: PhotoEvent) {
		this.displayPopin = true;
		console.log(photo);
		this.photoToDelete = photo;
	}

	public onVoted(toDelete: boolean) {
		console.log(toDelete);
		this.displayPopin = false;
		if (toDelete) {
			this.photoService.deletePhoto(this.authenticationService.getToken(), this.photoToDelete.id).subscribe(
				(event: HttpEvent<any>) => {
					this.dealWithHttpEventAfterDeletePhoto(event);
				},
				(err: HttpErrorResponse) => {
					this.errorService.dealWithHttpErrorResponse(err);
				}
			);
			var photoToDelete = this.photoToDelete;
			var index = this.photosEvent.findIndex(element => element == photoToDelete);
			this.photosEvent.splice(index, 1);
		} else {
			this.photoToDelete = null;
		}
	}
}