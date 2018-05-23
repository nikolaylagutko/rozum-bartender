import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RobotService} from './services/robot.service';
import {ConverterService} from './services/converter.service';
import {BusyModule} from 'angular2-busy';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BusyModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    RobotService,
    ConverterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
