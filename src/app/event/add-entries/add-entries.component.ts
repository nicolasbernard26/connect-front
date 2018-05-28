import { Component, OnInit, Input } from '@angular/core';
import { WeakProfileJson } from '../../_models/weak_profile/weak_profile_json';
import { WeakProfile } from '../../_models/weak_profile/weak_profile';
import { Event } from '../../_models/event/event';
import { Router } from '@angular/router';
import { ProfileService } from '../../_services/profile.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { EventService } from '../../_services/event.service';


@Component({
	selector: 'app-add-entries',
	templateUrl: './add-entries.component.html',
	styleUrls: ['./add-entries.component.scss']
})
export class AddEntriesComponent implements OnInit {
	private formData = new FormData();
	public connectionsThatShouldBeAdded : {
		profile : WeakProfile,
		toAdd : boolean,
		name : string
	}[] = [];
	@Input() event : Event;

	constructor(
		private router: Router,
		private profileService : ProfileService,
		private authenticationService : AuthenticationService,
		private eventService : EventService
	) { }

	ngOnInit() {
		this.profileService.getConnection().subscribe(
			data => {
				var profileJson : WeakProfileJson
				for(profileJson of data["connections"]){ 
					var profile = new WeakProfile(profileJson)
					var alreadyInvolve = this.event.entries.findIndex(profile => profile.id === profileJson.id) >= 0;
					console.log(this.event.entries.findIndex(profile => profile.id === profileJson.id))
					if(!alreadyInvolve){
						this.connectionsThatShouldBeAdded.push({ profile : profile, toAdd: false, name : profile.fullName() });
					}
				}
				console.log(this.connectionsThatShouldBeAdded)
			},
			err => {
				console.log(err)
			}
		);
	}

	change(profile: {profile : number, toAdd : boolean, name : string }){
		profile.toAdd = !profile.toAdd
	}

	onSubmit() {
		var connectionToAdd : {id : number, username : string}[] = this.connectionsThatShouldBeAdded.filter(connection => connection.toAdd).map(connection =>{return {id : connection.profile.id, username : connection.profile.user.username}})
		this.prepareSave(connectionToAdd)
		this.eventService.addInvolvement(this.event.id, this.formData).subscribe(
			data => {
				console.log(data);
				this.router.navigate(["/connect/event/" + data["id"]])
			},
			err => {
				console.log(err)
			}
		);
	}

	prepareSave(connectionToAdd : {id : number, username : string}[]){
		connectionToAdd.forEach(connection => this.formData.append(connection.username, connection.id.toString()));
	}
}
