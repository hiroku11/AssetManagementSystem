import { Router } from '@angular/router';
import { UserService } from './../../services/userService';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { ApiService } from '../../services/api.services';

declare function unescape(s:string): string;
declare function escape(s:string): string;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  signInError: boolean;
  login:any = {};
  constructor(private _apiService: ApiService,private injector: Injector,private userService: UserService) { }

  ngOnInit() {
    //https://b2897cdb.ngrok.io/rmsrest
    if(this.userService.authToken){
      let router = this.injector.get(Router);
        router.navigate(["dashboard"]);
    }
  }
  loginUser(){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa(`${this.login.username}:${this.login.password}`));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    this._apiService.post('/api/login',{}, headers).subscribe(
      (data:any)=>{
        localStorage.setItem('rmsAuthToken',data.XAuthToken);
        this.userService.userDetails = this.userService.decryptToken(data.XAuthToken);
        let router = this.injector.get(Router);
        setTimeout(()=>{
          router.navigate(["dashboard"]);
        },100)
        
      },
      (error)=>{
        console.log(error);
        this.signInError = true;
      }
    )
  }

}
