import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

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
  private error: any = null;

  constructor(
    private carlpadConnectionService: CarlpadConnectionService
  ) {
    this.connectionConfig = new CarlpadConnectionConfig();
    this.connectionConfig.connectionType = 'wifi';
  }

  ngOnInit() {

    const updateConnectionState = (state: boolean) => {
      this.connectionState = state;
      if (state) {
        this.error = null;
      }
    }

    const setError = (error: any): Observable<boolean> => {
      this.connectionState = false;
      this.error = error;
      console.error(error);
      return this.carlpadConnectionService.connectionStateObservable
    }

    this.carlpadConnectionService.connectionStateObservable
      .catch(setError)
      .subscribe(
          updateConnectionState,
          () => console.error("ERR"), 
          () => console.log('complete'))
  }

  get isConnected(): boolean {
    return this.connectionState;
  }

  connect(): void {
    this.carlpadConnectionService.connect(this.connectionConfig)
  }

  disconnect(): void {
    this.carlpadConnectionService.disconnect()
  }
}