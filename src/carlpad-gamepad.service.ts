import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ipcRenderer } from 'electron';

import { CarlpadAxisConfig } from './carlpad-axis-config';
import { CarlpadGamepadConfig } from './carlpad-gamepad-config';


@Injectable()
export class CarlpadGamepadService {

    private _gamepad: Gamepad | undefined;
    private _gamepadObservable: Observable<Gamepad>
    private _gamepadConfig: CarlpadGamepadConfig

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

        ipcRenderer.on('onLoadGamepadConfig', (event, config: CarlpadGamepadConfig) => {
            this._gamepadConfig = config;
        });

        this._gamepadObservable = Observable
            .interval(250)
            .map(() => this.currentGamepad)
            .share();

        ipcRenderer.send('loadGamepadConfig');
    }

    get gamepadData(): string {

        var gamepad = this.currentGamepad;

        if (!gamepad) return '90,90'
        if (!this._gamepadConfig) return '90,90';
        var gamepadConfig = _.find([this._gamepadConfig], (config) => config.id === gamepad.id);
        if (!gamepadConfig) return '90,90';

        let values = gamepad.axes
            .map((value, index) => {
                var axisConfig = _.find(gamepadConfig.axes, (axisConfig) => axisConfig.index === index);
                return { value, axisConfig }
            })
            .filter((axis) => axis.axisConfig && axis.axisConfig.selected)
            .map((axis) => this.toOutputValue(axis.value, axis.axisConfig))

        return values.join(",");
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

    get gamepadConfig(): CarlpadGamepadConfig {
        return this._gamepadConfig;
    }

    toOutputValue(inputValue: number, axisConfig: CarlpadAxisConfig) {
        function mapServo(value: number) {
            return mapRange(value * 100, -100, 100, 0, 180);
        }

        function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
            return Math.round((value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
        }

        if(axisConfig.inverted){
            inputValue = inputValue * -1;
        }

        return mapServo(inputValue);
    }

    saveConfiguration() {
        ipcRenderer.send('saveGamepadConfiguration', this.gamepadConfig);
    }

    resetConfiguration() {
        ipcRenderer.send('resetGamepadConfig');
    }
}