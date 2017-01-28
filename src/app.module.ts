import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component'
import {CarlpadConnection} from './carlpad-connection.component'
import {CarlpadControllerConfig} from './carlpad-controller-config.component'

@NgModule({
  imports: [BrowserModule],
  declarations: [
      AppComponent, 
      CarlpadConnection,
      CarlpadControllerConfig
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }