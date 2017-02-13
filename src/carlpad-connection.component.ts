import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ipcRenderer } from 'electron';

import { CarlpadConnectionConfig } from './carlpad-connection-config'
import { CarlpadConnectionService } from './carlpad-connection.service';
import { CarlpadGamepadService } from './carlpad-gamepad.service';


@Component({
  selector: 'carlpad-connection',
  templateUrl: 'carlpad-connection.component.html',
})
export class CarlpadConnection implements OnInit {

  connectionConfig: CarlpadConnectionConfig;
  connectionTypes = ['wifi', 'serial']
  private connectionState = false;
  private _dataObservable: Observable<string>;

  constructor(
    private carlpadConnectionService: CarlpadConnectionService,
    private carlpadGamepadService: CarlpadGamepadService
  ) {
    this._dataObservable = Observable
      .interval(1000)
      .combineLatest(
      this.carlpadConnectionService.connectionStateObservable,
      (i, connectionState) => connectionState)
      .filter(connectionState => connectionState)
      .map(() => this.carlpadGamepadService.gamepadData)
      .share();

    ipcRenderer.on('onLoadConnectionConfig', (event, config: CarlpadConnectionConfig) => {
      this.connectionConfig = config;
    });
  }

  ngOnInit() {
    this.carlpadConnectionService.connectionStateObservable
      .subscribe(state => this.connectionState = state)

    this._dataObservable
      .subscribe(data => this.carlpadConnectionService.send(data));

    ipcRenderer.send('loadConnectionConfig');
  }

  get isConnected(): boolean {
    return this.connectionState;
  }

  get error(): any {
    return this.carlpadConnectionService.connectionError
  }

  get dataObservable(): Observable<string> {
    return this._dataObservable;
  }

  connect(): void {
    this.carlpadConnectionService.connect(this.connectionConfig)
  }

  disconnect(): void {
    this.carlpadConnectionService.disconnect()
  }
}