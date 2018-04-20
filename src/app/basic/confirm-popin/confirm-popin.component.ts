import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-confirm-popin',
	templateUrl: './confirm-popin.component.html',
	styleUrls: ['./confirm-popin.component.scss']
})
export class ConfirmPopinComponent implements OnInit {

	@Output() onVoted = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() {
		console.log(this.onVoted);
	}

	public vote(agreed: boolean) {
		this.onVoted.emit(agreed);
	}
}
