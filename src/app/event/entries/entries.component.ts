import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from '../../_services/event.service';
import { ProfileService } from '../../_services/profile.service';
import { AuthenticationService } from '../../_services/authentication.service';


import { WeakProfile } from '../../_models/weak_profile/weak_profile';
import { StatusProfile } from '../../_models/status_profile';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit  {

	private id : number;
	@Input() entries : WeakProfile[] = [];

	constructor(
		private route: ActivatedRoute,
		private eventService : EventService,
		private authenticationService : AuthenticationService
	) { }

	ngOnInit() {
		this.id = +this.route.snapshot.paramMap.get('id');
	}

}
