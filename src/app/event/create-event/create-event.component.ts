import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventJson } from '../../_models/event/event_json';
import { Router } from '@angular/router';

import { EventService, AuthenticationService } from '../../_services/index'
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HttpEvent } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../_services/error.service';
import { EventFormModel } from '../../_models/event/event.form';
import { Event } from '../../_models/event/event';
import { FormControlName } from '@angular/forms';

@Component({
	selector: 'app-create-event',
	templateUrl: './create-event.component.html',
	styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

	public progressValue: string = "0%";

	public showErrors: boolean = false;

	public eventModel: EventFormModel = new EventFormModel();

	public eventForm: FormGroup = new FormGroup({
		'title': new FormControl(this.eventModel.title, [
			Validators.required
		]),
		'description': new FormControl(this.eventModel.description, [
			Validators.required
		]),
		'place': new FormControl(this.eventModel.place, [
			Validators.required
		]),
		'date_start': new FormControl(this.eventModel.date_start, [
			Validators.required
		]),
		'date_end': new FormControl(this.eventModel.date_end),
		'photo_event': new FormControl(this.eventModel.photo_event),
		'photo_filename': new FormControl(this.eventModel.photo_filename)
	});

	public submitted: boolean = false;

	@ViewChild('fileInput') fileInput: ElementRef;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private eventService: EventService,
		private authenticationService: AuthenticationService,
		private errorService: ErrorService
	) { }

	//#region 
	get title() { return this.eventForm.get('title'); }
	get description() { return this.eventForm.get('description'); }
	get place() { return this.eventForm.get('place'); }
	get date_start() { return this.eventForm.get('date_start'); }
	get date_end() { return this.eventForm.get('date_end'); }
	get photo_event() { return this.eventForm.get('photo_event'); }
	get photo_filename() { return this.eventForm.get('photo_filename'); }
	//#endregion

	ngOnInit() {
	}

	onSubmit() {
		if (!this.eventForm.valid) {
			this.showErrors = true;
			return;
		}
		console.log(this.eventForm.get('photo_event').value);
		const formData = this.prepareSave();
		//this.model.date_end = this.model.date_end_form.getFullYear() + '-' + (this.model.date_end_form.getMonth() + 1) + '-' + this.model.date_end_form.getDate();
		//this.model.date_start = this.model.date_start_form.getFullYear() + '-' + (this.model.date_start_form.getMonth() + 1) + '-' + this.model.date_start_form.getDate();
		this.eventService.createEvent(formData).subscribe(
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

	private prepareSave(): FormData {
		var date = new Date();
		var date_start: string = this.eventForm.get('date_start').value.getFullYear() + '-' + (this.eventForm.get('date_start').value.getMonth() + 1) + '-' + this.eventForm.get('date_start').value.getDate() + " 00:00Z";
		this.eventForm.get('date_start').setValue(new Date(date_start));
		var date_end: string = this.eventForm.get('date_end').value.getFullYear() + '-' + (this.eventForm.get('date_end').value.getMonth() + 1) + '-' + this.eventForm.get('date_end').value.getDate() + " 00:00Z";
		this.eventForm.get('date_end').setValue(new Date(date_end));

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
				this.router.navigate(["/event/" + event.body["id"] + "/home"])
				return event.body;
		}
	}

}
