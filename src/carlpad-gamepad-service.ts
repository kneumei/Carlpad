import { Injectable } from '@angular/core';

@Injectable()
export class CarlpadGamepadService {

    constructor() {
        window.addEventListener('gamepadconnected', (e) => {
            console.log(e);
        })
        window.addEventListener('gamepaddisconnected', (e) => {
            console.log(e);
        })
    }

    get gamepadData(): string {
        return "0,0";
    }
}