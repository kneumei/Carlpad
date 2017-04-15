import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component'
import { Connection } from './components/connection.component';
import { ConnectionWifiConfig } from './components/connection-wifi-config.component';
import { ConnectionSerialConfig } from './components/connection-serial-config.component';
import { DataPreview } from './components/data-preview.component';
import { CarlpadGamepad } from './components/gamepad-config.component';
import { CarlpadGamepadAxis } from './components/gamepad-axis.component';

import { ConnectionService } from './services/connection.service';
import { GamepadService } from './services/gamepad.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
   AppComponent,
    Connection,
    ConnectionWifiConfig,
    ConnectionSerialConfig,
    DataPreview,
    CarlpadGamepad,
    CarlpadGamepadAxis
  ],
  providers: [
    ConnectionService,
    GamepadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }