import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component'
import { CarlpadConnection } from './carlpad-connection.component';
import { CarlpadConnectionWifiConfig } from './carlpad-connection-wifi-config.component';
import { CarlpadConnectionSerialConfig } from './carlpad-connection-serial-config.component';
import { CarlpadDataPreview } from './carlpad-data-preview.component';
import { CarlpadGamepad } from './carlpad-gamepad-config.component';
import { CarlpadGamepadAxis } from './carlpad-gamepad-axis.component';

import { CarlpadConnectionService } from './carlpad-connection.service';
import { CarlpadGamepadService } from './carlpad-gamepad.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    CarlpadConnection,
    CarlpadConnectionWifiConfig,
    CarlpadConnectionSerialConfig,
    CarlpadDataPreview,
    CarlpadGamepad,
    CarlpadGamepadAxis
  ],
  providers: [
    CarlpadConnectionService,
    CarlpadGamepadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }