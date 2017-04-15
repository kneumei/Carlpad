import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { BehaviorSubject, Observable } from 'rxjs';

import { ConnectionConfig } from '../models/connection-config';

@Injectable()
export class ConnectionService {

  private connectionConfig: ConnectionConfig;
  private _isConnected: boolean;
  private subject = new BehaviorSubject(false);
  private _error: any

  constructor() {
    this._isConnected = false;

    ipcRenderer.on('onConnected', () => {
      this._error = null;
      this.subject.next(true);
    });

    ipcRenderer.on('onDisconnected', () => this.subject.next(false));

    ipcRenderer.on('onError', (event, err) => {
      this._error = err;
      this.subject.next(false)
    });
  }

  send(data: string) {
    ipcRenderer.send('send', data);
  }

  connect(config: ConnectionConfig): void {
    this.connectionConfig = config;
    ipcRenderer.send('connect', config);
  }

  disconnect(): void {
    ipcRenderer.send('disconnect');
  }

  get connectionStateObservable(): Observable<boolean> {
    return this.subject;
  }

  get connectionError(): any {
    return this._error;
  }
}
