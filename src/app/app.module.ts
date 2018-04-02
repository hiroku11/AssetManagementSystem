import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core-components.module';
import { SharedService } from './services/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/router.module';
import { UserService } from './services/userService';
import { NgModule,APP_INITIALIZER  } from '@angular/core';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.services';
import { HttpActionDirective } from './directive/http-action.directive';



@NgModule({
  declarations: [
    AppComponent,
    HttpActionDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [
    SharedService,
    ApiService,
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUserDetails,
      deps: [UserService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getUserDetails(userService: UserService) {
  return () => userService.getUserDetails().then((data)=>{
    if(!data){
      return false;
    }
  });
}

//license and insurance,inspection information can be different components 