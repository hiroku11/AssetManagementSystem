import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() address: any = {};
  @Output() public addressChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
