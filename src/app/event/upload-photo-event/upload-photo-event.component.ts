import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventJson } from '../../_models/event/event_json';
import { Router, ActivatedRoute } from '@angular/router';

import { EventService, AuthenticationService } from '../../_services/index'
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpEvent } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../_services/error.service';
import { Type } from '@angular/core/src/type';

@Component({
	selector: 'app-upload-photo-event',
	templateUrl: './upload-photo-event.component.html',
	styleUrls: ['./upload-photo-event.component.scss']
})
export class UploadPhotoEventComponent implements OnInit {

	public progressValue: string = "0%";
	public submitted: boolean = false;
	private id: number;
	public input: FormData = new FormData();
	public images: File[] = [];
	public imagesSrc: { src: string }[] = [];
	public showPreview : boolean = false;

	get isUploading() { return this.images.length > 0; }

	@ViewChild('fileInput') fileInput: ElementRef;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private eventService: EventService,
		private authenticationService: AuthenticationService,
		private errorService: ErrorService
	) { }

	ngOnInit() {
		this.id = +this.route.snapshot.paramMap.get('id');
	}

	onSubmit() {
		console.log("submit")
		const formData = this.prepareSave();
		console.log(formData.get(this.images[0].name))
		this.eventService.postPhotosEvent(this.id, formData).subscribe(
			(event: HttpEvent<any>) => {
				console.log(this.dealWithHttpEvent(event));
			},
			(err: HttpErrorResponse) => {
				this.errorService.dealWithHttpErrorResponse(err);
			}
		)
	}


	onFileChange(event) {
		if (event.target.files.length > 0) {
			this
			var file: File;
			console.log(event.target.url)
			for (file of event.target.files) {
				if (file.type == "image/jpeg" || file.type == "image/png") {
					this.images.push(file)
					this.readAndPreview(file, this.imagesSrc);
				}
			}
		}
	}

	public showNumberOfPhoto(){
		return this.images.length;
	}

	private setImagePreview(name : string){
		var index = this.images.map(function(e) { return e.name; }).indexOf(name);
		if(index >= 0){
			if(this.imagesSrc[index]){
				console.log(this.imagesSrc.length)
				return this.imagesSrc[index].src;
			}
		}
		return ""
	}

	private readAndPreview(file: File, imagesSrc : {src: string }[], ) {
		var reader = new FileReader();
		reader.addEventListener("load", function (ev) {
			imagesSrc.push({ src: this.result })
		}, false);
		reader.readAsDataURL(file);
	}

	private prepareSave(): FormData {
		var formData = new FormData();
		for(var index in this.images){
			console.log(index)
			formData.append(this.images[index].name, this.images[index])
		}
		return formData;
	}

	clearFiles() {
		this.images = [];
		this.imagesSrc = [];
	}

	clearFile(i : number) {
		this.images.splice(i, 1);
		this.imagesSrc.splice(i, 1);
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
				if(event.body["information"] == "no_error"){
					this.router.navigate(["/event/" + this.id + "/home"])
				}
				return event.body;
		}
	}

}
