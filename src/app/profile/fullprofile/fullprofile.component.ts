import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Profile } from '../../_models/profile/profile';



@Component({
  selector: 'app-full-profile',
  templateUrl: './fullprofile.component.html',
  styleUrls: ['./fullprofile.component.scss']
})
export class FullProfileComponent implements OnInit {

	@Input() profile: Profile;

	public filterText : string = "";

	constructor() { }

	ngOnInit() {
		console.log(this.profile.involves)
		
	}

	filter() {
		this.profile.involves.forEach(involve => involve.filter = !involve.event.title.toLowerCase().includes(this.filterText.toLowerCase()))
		this.profile.connections.forEach(connection => connection.filter = !connection.fullName().toLowerCase().includes(this.filterText.toLowerCase()))
	}

	removeFilter() {
		this.filterText = "";
		this.profile.involves.forEach(involve => involve.filter = false)
		this.profile.connections.forEach(connection => connection.filter = false)
	}
}
