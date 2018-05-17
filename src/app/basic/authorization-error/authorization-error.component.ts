import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-authorization-error',
  templateUrl: './authorization-error.component.html',
  styleUrls: ['./authorization-error.component.scss']
})
export class AuthorizationErrorComponent implements OnInit {

  @Input() message : string;
  
  constructor() { }

  ngOnInit() {
  }

}
