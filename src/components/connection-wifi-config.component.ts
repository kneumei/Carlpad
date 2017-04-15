import { Component, Input } from '@angular/core';

import { ConnectionConfig } from '../models/connection-config';

@Component({
  selector: 'connection-wifi-config',
  templateUrl: './components/connection-wifi-config.component.html'
})
export class ConnectionWifiConfig {
  @Input() connectionConfig: ConnectionConfig;
}