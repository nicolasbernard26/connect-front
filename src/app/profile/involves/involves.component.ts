import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ProfileService } from '../../_services/profile.service';

import { Event } from '../../_models/event/event';
import { Involve } from '../../_models/involve/involve';

@Component({
  selector: 'app-involves',
  templateUrl: './involves.component.html',
  styleUrls: ['./involves.component.scss']
})
export class InvolvesComponent implements OnInit, OnDestroy {

	@Input() involves : Involve[] = null;

	constructor(
		private profileService : ProfileService
	) { }

	ngOnInit() {
		console.log(this.involves);
	}

	ngOnDestroy(){
	}

	public show(event : Event){
		event.changeVisible();
	}
}
