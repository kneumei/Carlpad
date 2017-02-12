import { Component } from '@angular/core';

import { CarlpadGamepadService } from './carlpad-gamepad.service';

@Component({
    selector: 'carlpad-gamepad',
    template: `
<div class="card">
    <div class="card-header">
        <h2> CARLBot Gamepad</h2>
         <form class="form-inline">
            <label for="gamepadId" class="col-2">Gamepad ID: </label>
            <input *ngIf="gamepad" class="col-10" [(ngModel)]="gamepad.id" name="gamepadId" id="gamepadId" readonly/>
            <input *ngIf="!gamepad" class="col-10" value="disconnected" name="gamepadId" id="gamepadId" readonly/>
        </form>
    </div>
    <div class="card-block" *ngIf=" gamepad">
        <div class="row">
            <carlpad-gamepad-axis 
                *ngFor="let axis of gamepad.axes; let i = index" 
                [axisIndex]="i" >
            </carlpad-gamepad-axis>
        </div>  
    </div>
</div>
`
})
export class CarlpadGamepad {
    constructor(
        private carlpadGamepadService: CarlpadGamepadService
    ) {
    }

    get gamepad(): Gamepad | undefined {
        return this.carlpadGamepadService.gamepad;
    }
}