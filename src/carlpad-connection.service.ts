import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';

import { CarlpadConnectionConfig } from './carlpad-connection-config';

@Injectable()
export class CarlpadConnectionService {

    private connectionConfig: CarlpadConnectionConfig;
    private _isConnected: boolean;

    constructor(zone: NgZone) {
        this._isConnected = false;

        ipcRenderer.on('onConnected', () => {
            zone.run(() => {
                this._isConnected = true;
            })
        });

        ipcRenderer.on('onDisconnected', () => {
            zone.run(() => {
                this._isConnected = false;
            })
        });

        ipcRenderer.on('onError', (event, err) => {
            zone.run(() => {
                console.error(err);
            })
        });
    }

    connect(config: CarlpadConnectionConfig): void {
        this.connectionConfig = config;
        ipcRenderer.send('connect', config);
    }

    disconnect(): void {
        ipcRenderer.send('disconnect');
    }

    get isConnected() {
        return this._isConnected;
    }
}