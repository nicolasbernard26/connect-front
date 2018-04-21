import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../_models/event/event';

@Component({
  selector: 'app-home-event',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeEventComponent implements OnInit {

	@Input() event : Event;

  constructor() { }

  ngOnInit() {
  }

}
