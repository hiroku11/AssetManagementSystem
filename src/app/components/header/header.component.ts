import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails:any;
  constructor(private userService: UserService) { 
    this.userDetails = this.userService.userDetails;
  }

  ngOnInit() {
  }
  logOut(){
    this.userService.logOut();
  }
}
