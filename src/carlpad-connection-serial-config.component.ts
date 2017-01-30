import { Component, Input } from '@angular/core';

import {CarlpadConnectionConfig} from './carlpad-connection-config';

@Component({
  selector: 'carlpad-connection-serial-config',
  template:'<h4>serial</h4>'
})
export class CarlpadConnectionSerialConfig {

  @Input() connectionConfig: CarlpadConnectionConfig;
}