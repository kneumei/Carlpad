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

  connectionConfig: CarlpadConnectionConfig;
  connectionTypes = ['wifi', 'serial']

  constructor(
    private carlpadConnectionService: CarlpadConnectionService
  ) {
    this.connectionConfig = new CarlpadConnectionConfig();
    this.connectionConfig.connectionType = 'wifi';
  }

  get isConnected(): boolean {
    return this.carlpadConnectionService.isConnected
  }

  connect(): void {
    this.carlpadConnectionService.connect(this.connectionConfig)
  }

  disconnect(): void {
    this.carlpadConnectionService.disconnect()
  }
}