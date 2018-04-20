import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Profile } from '../../_models/profile/profile';



@Component({
  selector: 'app-full-profile',
  templateUrl: './fullprofile.component.html',
  styleUrls: ['./fullprofile.component.scss']
})
export class FullProfileComponent implements OnInit {

	@Input() profile: Profile;

	constructor() { }

	ngOnInit() {
		console.log(this.profile.involves)
		
	}

	onKey(event: any) { // without type info
		//this.values += event.target.value + ' | ';
		console.log(event.target.value);
		for(var involve of this.profile.involves){
			involve.filter = !involve.event.title.toLowerCase().includes(event.target.value.toLowerCase());
		}

		for(var connection of this.profile.connections){
			connection.filter = !connection.fullName().toLowerCase().includes(event.target.value.toLowerCase());
		}
	}
}
