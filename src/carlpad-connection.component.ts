import { Component } from '@angular/core';

import { CarlpadConnectionConfig } from './carlpad-connection-config'
import { CarlpadConnectionService } from './carlpad-connection.service';


@Component({
  selector: 'carlpad-connection',
  templateUrl: 'carlpad-connection.component.html',
  providers: [
    CarlpadConnectionService
  ],
})
export class CarlpadConnection {

  selectedConnectionType = 'wifi';
  connectionTypes = ['wifi', 'serial']

  constructor(
    private carlpadConnectionService: CarlpadConnectionService
  ) {  }

  get isConnected(): boolean {
    return this.carlpadConnectionService.isConnected
  }

  connect(): void {
    this.carlpadConnectionService.connect(new CarlpadConnectionConfig())
  }

  disconnect(): void {
    this.carlpadConnectionService.disconnect()
  }
}