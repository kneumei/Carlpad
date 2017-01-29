import {Injectable} from '@angular/core';

import {CarlpadConnectionConfig} from './carlpad-connection-config';

@Injectable()
export class CarlpadConnectionService {

    private connectionConfig : CarlpadConnectionConfig;
    
    constructor(){
        this._isConnected = false;
    }

     private _isConnected :boolean;

    connect(config: CarlpadConnectionConfig): void {
        this.connectionConfig = config;
        this._isConnected = true;
    }

    disconnect(): void {
        this._isConnected = false;
    }

     get isConnected(){
         return this._isConnected;
     }

}