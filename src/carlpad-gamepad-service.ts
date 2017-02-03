import { Injectable } from '@angular/core';

@Injectable()
export class CarlpadGamepadService {

    get gamepadData(): string{
        return "0,0";
    }
}