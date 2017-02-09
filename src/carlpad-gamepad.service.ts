import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class CarlpadGamepadService {

    constructor() {
        window.addEventListener('gamepadconnected', (connectedEvent: any) => {
            let gamepad = (connectedEvent.gamepad) as Gamepad;
            if (!gamepad.id.includes("Unknown") && !this._gamepad) {
                this._gamepad = gamepad;
                console.log('connected!');
            }
        });
        window.addEventListener('gamepaddisconnected', (disconnectedEvent: any) => {
            let gamepad = (disconnectedEvent.gamepad) as Gamepad;
            if (this._gamepad && this._gamepad.id === gamepad.id) {
                this._gamepad = null;
            }
        });
    }

    private _gamepad: Gamepad | null

    get gamepadData(): string {

        function mapServo(value: number) {
            return mapRange(value * 100, -100, 100, 0, 180);
        }

        function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
            return Math.round((value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
        }

        if (!this._gamepad) return '90,90'

        var gp = _.find(navigator.getGamepads(), (gp) => gp.id === this._gamepad.id);

        let leftWheel = mapServo(gp.axes[1]);
        let rightWheel = mapServo(gp.axes[5]);
        return [leftWheel, rightWheel].join(",");
    }

    get isConnected(): boolean {
        return !!this._gamepad;
    }
}