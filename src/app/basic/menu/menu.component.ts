import { Component, OnInit } from '@angular/core';

import { AuthenticationService, ProfileService } from '../../_services/index';
import { useAnimation } from '@angular/animations/src/animation_metadata';
import { Profile } from '../../_models/profile/profile';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	private profile : Profile;

	constructor(
		private auth : AuthenticationService,
		private profileService: ProfileService,
	) {}

	ngOnInit() {
		console.log("ngOnInit")
		this.profile = JSON.parse(localStorage.getItem('profile'));
	}

	private openNav() {
		console.log("Open Nav")
		document.getElementById("mySidenav").style.width = "250px";
	}
	
	private closeNav() {
		console.log("Close nav");
		document.getElementById("mySidenav").style.width = "0";
	}
}
