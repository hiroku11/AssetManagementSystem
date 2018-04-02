import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  message: string;
  constructor() { 
    this.message = "Some error occured.";
  }

  ngOnInit() {
  }

}
