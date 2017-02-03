import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CarlpadConnectionConfig } from './carlpad-connection-config'
import { CarlpadConnectionService } from './carlpad-connection.service';


@Component({
  selector: 'carlpad-connection',
  templateUrl: 'carlpad-connection.component.html',
  providers: [
    CarlpadConnectionService
  ],
})
export class CarlpadConnection implements OnInit {

  connectionConfig: CarlpadConnectionConfig;
  connectionTypes = ['wifi', 'serial']
  private connectionState = false;

  constructor(
    private carlpadConnectionService: CarlpadConnectionService
  ) {
    this.connectionConfig = new CarlpadConnectionConfig();
    this.connectionConfig.connectionType = 'wifi';
  }

  ngOnInit() {

    const updateConnectionState = (state: boolean) => {
      this.connectionState = state;
    }

    this.carlpadConnectionService.connectionStateObservable
      .subscribe(updateConnectionState)
  }

  get isConnected(): boolean {
    return this.connectionState;
  }

  get error(): any {
    return this.carlpadConnectionService.connectionError
  }

  connect(): void {
    this.carlpadConnectionService.connect(this.connectionConfig)
  }

  disconnect(): void {
    this.carlpadConnectionService.disconnect()
  }
}