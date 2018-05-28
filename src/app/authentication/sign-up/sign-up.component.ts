import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventJson } from '../../_models/event/event_json';
import { Router } from '@angular/router';

import { HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HttpEvent } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../_services/error.service';
import { Event } from '../../_models/event/event';
import { FormControlName } from '@angular/forms';
import { Profile } from '../../_models/profile/profile';
import { ProfileJson } from '../../_models/profile/profile_json';
import { ProfileService } from '../../_services/profile.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

	public progressValue: string = "0%";

	public showErrors: boolean = false;

	public profileModel: ProfileJson = new ProfileJson();

	public profileForm: FormGroup = new FormGroup({
		'first_name': new FormControl(this.profileModel.user.first_name, [
			Validators.required
		]),
		'last_name': new FormControl(this.profileModel.user.last_name, [
			Validators.required
		]),
		'email': new FormControl(this.profileModel.user.email, [
			Validators.required
		]),
		'password': new FormControl(this.profileModel.user.password, [
			Validators.required
		]),
		'confirm_password': new FormControl(this.profileModel.user.confirm_password, [
			Validators.required
		]),
		'avatar': new FormControl(this.profileModel.avatar),
		'avatar_name': new FormControl(this.profileModel.avatar_name)
	});

	public submitted: boolean = false;

	@ViewChild('fileInput') fileInput: ElementRef;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private profileService: ProfileService,
		private authenticationService: AuthenticationService,
		private errorService: ErrorService
	) { }

	//#region 
	get first_name() { return this.profileForm.get('first_name'); }
	get last_name() { return this.profileForm.get('last_name'); }
	get email() { return this.profileForm.get('email'); }
	get avatar() { return this.profileForm.get('avatar'); }
	get avatar_name() { return this.profileForm.get('avatar_name'); }
	get password() { return this.profileForm.get('password'); }
	get confirm_password() { return this.profileForm.get('confirm_password'); }
	//#endregion

	ngOnInit() {
	}

	onSubmit() {
		if (!this.profileForm.valid) {
			this.showErrors = true;
			return;
		}
		const formData = this.prepareSave();
		console.log(formData)
		this.authenticationService.signUp(formData).subscribe(
			(event: HttpEvent<any>) => {
				console.log(event)
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
			this.profileForm.get('avatar').setValue(file);
			this.profileForm.get('avatar_name').setValue(file.name);
			this.profileModel.avatar_name = file.name;
		}
	}

	private prepareSave(): FormData {
		let formData = new FormData();
		formData.append('first_name', this.profileForm.get('first_name').value);
		formData.append('last_name', this.profileForm.get('last_name').value);
		formData.append('email', this.profileForm.get('email').value);
		formData.append('avatar', this.profileForm.get('avatar').value);
		formData.append('password', this.profileForm.get('password').value);
		return formData;
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
				this.authenticationService.login(this.profileForm.get('email').value, this.profileForm.get('password').value)
		}
	}
}
