import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventJson } from '../../_models/event/event_json';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HttpEvent } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../_services/error.service';
import { EventFormModel } from '../../_models/event/event.form';
import { Event } from '../../_models/event/event';
import { FormControlName } from '@angular/forms';
import { EventService } from '../../_services/event.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
	selector: 'app-edit-event',
	templateUrl: './edit-event.component.html',
	styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

	private id: number;
	public progressValue: string = "0%";
	public showErrors: boolean = false;
	public eventModel: EventFormModel = new EventFormModel();
	public eventForm: FormGroup = new FormGroup({
		title: new FormControl(this.eventModel.title, [
			Validators.required
		]),
		description: new FormControl(this.eventModel.description, [
			Validators.required
		]),
		place: new FormControl(this.eventModel.place, [
			Validators.required
		]),
		date_start: new FormControl(this.eventModel.date_start, [
			Validators.required
		]),
		date_end: new FormControl(this.eventModel.date_end),
		photo_event: new FormControl(this.eventModel.photo_event),
		photo_filename: new FormControl(this.eventModel.photo_filename)
	});
	public authorizationError: boolean = false;
	public submitted: boolean = false;
	public loading: boolean = true;

	@ViewChild('fileInput') fileInput: ElementRef;

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private router: Router,
		private eventService: EventService,
		private authenticationService: AuthenticationService,
		private errorService: ErrorService
	) { }

	//#region 
	get getTitle() { return this.eventForm.get('title'); }
	get getDescription() { return this.eventForm.get('description'); }
	get getPlace() { return this.eventForm.get('place'); }
	get getDateStart() { return this.eventForm.get('date_start'); }
	get getDateEnd() { return this.eventForm.get('date_end'); }
	get getPhotoEvent() { return this.eventForm.get('photo_event'); }
	get getPhotoFilename() { return this.eventForm.get('photo_filename'); }

	setTitle(formerTitle) { this.eventForm.setValue({ title: formerTitle }) }
	setDescription(formerTitle) { this.eventForm.setValue({ description: formerTitle }) }
	setPlace(formerTitle) { this.eventForm.setValue({ place: formerTitle }) }
	setDateStart(formerTitle) { this.eventForm.setValue({ date_start: formerTitle }) }
	setDateEnd(formerTitle) { this.eventForm.setValue({ date_end: formerTitle }) }
	setPhotoEvent(formerTitle) { this.eventForm.setValue({ photo_event: formerTitle }) }
	setPhotoFilename(formerTitle) { this.eventForm.setValue({ photo_filename: formerTitle }) }
	//#endregion

	ngOnInit() {
		this.route.params.subscribe(
			val => {
				if (val.id != this.id) {
					this.id = val.id;
					this.eventService.getGlobalInformation(this.id).subscribe(
						(event: HttpEvent<any>) => {
							this.receivedEvent(event);
						},
						(err: HttpErrorResponse) => {
							this.loading = false;
							this.errorService.dealWithHttpErrorResponse(err);
						}
					)
				}
			}
		)
	}

	onSubmit() {
		console.log(this.eventForm)
		if (!this.eventForm.valid) {
			this.showErrors = true;
			return;
		}
		var formData = this.prepareSave();
		console.log(formData)
		this.eventService.updateEvent(this.id, formData).subscribe(
			(event: HttpEvent<any>) => {
				this.dealWithHttpEvent(event)
			},
			err => {
				this.errorService.dealWithHttpErrorResponse(err);
			}
		);
	}

	onFileChange(event) {
		if (event.target.files.length > 0) {
			let file = event.target.files[0];
			console.log(file)
			this.eventForm.get('photo_event').setValue(file);
			this.eventForm.get('photo_filename').setValue(file.name);
			this.eventModel.photo_filename = file.name;
		}
	}

	private receivedEvent(event: HttpEvent<any>) {
		switch (event.type) {
			case HttpEventType.Response:
				this.loading = false;
				event.body["event"];
				console.log(event.body);
				if(event.body['error'] == "You are not authorized"){
					this.authorizationError = true;
					return
				}
				this.mapEvent(event.body['event'])
		}
	}

	private prepareSave(): FormData {
		var date_start: string = this.eventForm.get('date_start').value.getFullYear() + '-' + (this.eventForm.get('date_start').value.getMonth() + 1) + '-' + this.eventForm.get('date_start').value.getDate() + " 00:00Z";
		var date_end: string = this.eventForm.get('date_end').value.getFullYear() + '-' + (this.eventForm.get('date_end').value.getMonth() + 1) + '-' + this.eventForm.get('date_end').value.getDate() + " 00:00Z";

		let input = new FormData();
		input.append('title', this.eventForm.get('title').value);
		input.append('description', this.eventForm.get('description').value);
		input.append('place', this.eventForm.get('place').value);
		input.append('date_start', date_start);
		input.append('date_end', date_end);
		input.append('photo_event', this.eventForm.get('photo_event').value);
		input.append('photo_filename', this.eventForm.get('photo_filename').value);
		return input;
	}

	private mapEvent(event: EventJson) {
		if (this.authenticationService.getId() != event.admin.id) {
			this.authorizationError = true;
			return;
		}
		this.eventForm.setValue({
			title: event.title,
			description: event.description,
			place: event.place,
			date_start: new Date(event.date_start),
			date_end: new Date(event.date_end),
			photo_event: null,
			photo_filename: null
		})
		this.loading = false;
	}

	clearFile() {
		//this.form.get('avatar').setValue(null);
		this.fileInput.nativeElement.value = '';
	}

	private dealWithHttpEvent(event: HttpEvent<any>): any {
		switch (event.type) {
			case HttpEventType.Sent:
				console.log('Request sent!');
				break;
			case HttpEventType.ResponseHeader:
				console.log('Response header received!');
				break;
			case HttpEventType.UploadProgress:
				const percentDone = Math.round(100 * event.loaded / event.total);
				console.log(`File is ${percentDone}% uploaded.`);
				this.progressValue = `${percentDone}%`;
			case HttpEventType.DownloadProgress:
				const kbLoaded = Math.round(event.loaded / 1024);
				console.log(`Download in progress! ${kbLoaded}Kb loaded`);
				break;
			case HttpEventType.Response:
				console.log('Done!', event.body);
				this.router.navigate(["/connect/event/" + event.body["id"] + "/home"])
				return event.body;
		}
	}

}
