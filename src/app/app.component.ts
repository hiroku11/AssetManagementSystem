import { AlertsLoaderService } from './services/alerts-loader.service';
import { SharedService } from './services/shared.service';
import { HttpActionDirective } from './directive/http-action.directive';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'Asset Management System';
  constructor(public _httpIndicatorService: AlertsLoaderService){}
  @ViewChild(HttpActionDirective) httpActionDirective: HttpActionDirective;
  ngAfterViewInit() {
    this._httpIndicatorService.httpActionIndicator = this.httpActionDirective;
  }
}
