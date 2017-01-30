import { Component, Input } from '@angular/core';

import {CarlpadConnectionConfig} from './carlpad-connection-config';

@Component({
  selector: 'carlpad-connection-wifi-config',
  template:`
    <div class="form-group row">
      <label for="ipaddress" class="col-2 col-form-label">IP Address: </label>
      <div class="col-10">
        <input [(ngModel)]="connectionConfig.wifiIp" class="form-control" type="text" id="ipaddress">
      </div>
      <label for="port" class="col-2 col-form-label">Port: </label>
      <div class="col-10">
        <input [(ngModel)]="connectionConfig.wifiPort" class="form-control" type="number" id="port">
      </div>
    </div>
  `
})
export class CarlpadConnectionWifiConfig {
  @Input() connectionConfig: CarlpadConnectionConfig;
}