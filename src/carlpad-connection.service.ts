import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';
import {BehaviorSubject, Subject} from 'rxjs';

import { CarlpadConnectionConfig } from './carlpad-connection-config';

@Injectable()
export class CarlpadConnectionService {

    private connectionConfig: CarlpadConnectionConfig;
    private _isConnected: boolean;
    private subject = new BehaviorSubject(false);
    private _error: any

    constructor(zone: NgZone) {
        this._isConnected = false;

        ipcRenderer.on('onConnected', () => {
            this._error = null;
            zone.run(() => this.subject.next(true));
        });

        ipcRenderer.on('onDisconnected', () => {
            zone.run(() => this.subject.next(false));
        });

        ipcRenderer.on('onError', (event, err) => {
            zone.run(() => {
                this._error = err;
                this.subject.next(false)
            });
        });
    }

    send(data: string){
        ipcRenderer.send('send', data);
    }

    connect(config: CarlpadConnectionConfig): void {
        this.connectionConfig = config;
        ipcRenderer.send('connect', config);
    }

    disconnect(): void {
        ipcRenderer.send('disconnect');
    }

    get connectionStateObservable(): Subject<boolean>
    {
        return this.subject;
    }

    get connectionError(): any {
        return this._error;
    }
}