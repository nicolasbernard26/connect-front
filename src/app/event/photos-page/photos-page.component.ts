import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PhotoEvent } from '../../_models/photo_event/photo_event';
import { AuthenticationService } from '../../_services/authentication.service';
import { ErrorService } from '../../_services/error.service';
import { PhotosService } from '../../_services/photos.service';
import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { PhotoEventJson } from '../../_models/photo_event/photo_event_json';

@Component({
	selector: 'app-photos-page',
	templateUrl: './photos-page.component.html',
	styleUrls: ['./photos-page.component.scss']
})
export class PhotosPageComponent implements OnInit {

	@Input() photosEvent: PhotoEvent[] = [];
	@Input() currentPage: number;
	@Input() page: number;
	@Input() pageId: number;
	@Input() eventId: number;

	public displayPopin: boolean = false;
	public photoToDelete: PhotoEvent = null;
	public photoModal: PhotoEvent = null;

	constructor(
		public authenticationService: AuthenticationService,
		private errorService: ErrorService,
		private photoService: PhotosService) { }

	ngOnInit() {
		
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
			this.photoService.deletePhoto(this.eventId, this.photoToDelete.id).subscribe(
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

	public showModal(photo: PhotoEvent) {
		this.photoModal = photo;
	}

	public retrieveModal() {
		this.photoModal = null;
	}

	public next(photo: PhotoEvent, i: number) {
		var index = this.photosEvent.findIndex(function (element) {
			return element === photo;
		});
		console.log(index);
		this.photoModal = this.photosEvent[index + i];
	}
}
