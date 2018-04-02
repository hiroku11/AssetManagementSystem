import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {
  message: string;
  constructor() {
    this.message = "Successfully saved.";
   }

  ngOnInit() {
  }

}
