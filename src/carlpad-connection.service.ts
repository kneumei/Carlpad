import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';

import { CarlpadConnectionConfig } from './carlpad-connection-config';

@Injectable()
export class CarlpadConnectionService {

    private connectionConfig: CarlpadConnectionConfig;
    private _isConnected: boolean;

    constructor(zone: NgZone) {
        this._isConnected = false;

        ipcRenderer.on('onConnected', () =>{
            zone.run(() =>{
                this._isConnected = true;
            })
        });
    }

    connect(config: CarlpadConnectionConfig): void {
        this.connectionConfig = config;
        this.startConnection(config); 
    }

    disconnect(): void {
        this._isConnected = false;
    }

    get isConnected() {
        return this._isConnected;
    }

    private startConnection(config: CarlpadConnectionConfig){
        ipcRenderer.send('connect', config);
    }
}