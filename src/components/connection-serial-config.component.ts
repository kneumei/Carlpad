import { Component, Input } from '@angular/core';

import { ConnectionConfig } from '../models/connection-config';

@Component({
  selector: 'connection-serial-config',
  template: '<h4>serial</h4>'
})
export class ConnectionSerialConfig {

  @Input() connectionConfig: ConnectionConfig;
}
