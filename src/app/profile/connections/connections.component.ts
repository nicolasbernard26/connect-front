import {Component, ElementRef, ViewChild, OnInit, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { ProfileService } from '../../_services/profile.service';

import { Connections } from '../../_models/connections/connections';
import { AuthenticationService } from '../../_services/index';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  inputs: ['connection'],
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

	@Input() connections : Connections;
		
	delete() {
		console.log("delete")
	}

	constructor(
		private authenticationService : AuthenticationService
	) {}

	ngOnInit() {
		console.log(this.connections)
	}	
}
