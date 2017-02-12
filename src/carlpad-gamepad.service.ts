import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class CarlpadGamepadService {

    constructor() {
        window.addEventListener('gamepadconnected', (connectedEvent: any) => {

            let gamepad = (connectedEvent.gamepad) as Gamepad;

            if (!gamepad.id.includes("Unknown") && !this._gamepad) {
                this._gamepad = gamepad;
            }
        });
        window.addEventListener('gamepaddisconnected', (disconnectedEvent: any) => {
            let gamepad = (disconnectedEvent.gamepad) as Gamepad;
            if (this._gamepad && this._gamepad.id === gamepad.id) {
                this._gamepad = undefined;
            }
        });

        this._gamepadObservable = Observable
            .interval(250)
            .map(() => this.currentGamepad)
            .share();
    }

    private _gamepad: Gamepad | undefined;
    private _gamepadObservable: Observable<Gamepad>

    get gamepadData(): string {

        var gamepad = this.currentGamepad;

        if (!gamepad) return '90,90'

        let leftWheel = this.toOutputValue(gamepad.axes[1]);
        let rightWheel = this.toOutputValue(gamepad.axes[5]);
        return [leftWheel, rightWheel].join(",");
    }

    get gamepad() {
        return this._gamepad;
    }

    get currentGamepad(): Gamepad | undefined {
        return _.find(navigator.getGamepads(), (gp) => gp.id === this.gamepad.id);
    }

    get gamepadObservable(): Observable<Gamepad> {
        return this._gamepadObservable;
    }

    toOutputValue(inputValue: number) {
        function mapServo(value: number) {
            return mapRange(value * 100, -100, 100, 0, 180);
        }

        function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
            return Math.round((value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
        }

        return mapServo(inputValue);
    }
}