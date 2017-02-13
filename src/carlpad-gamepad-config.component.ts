import { Component } from '@angular/core';

import { CarlpadGamepadService } from './carlpad-gamepad.service';


@Component({
    selector: 'carlpad-gamepad',
    template: `
<div class="card">
    <div class="card-header">
        <h2> CARLBot Gamepad Configuration</h2>
         <form >
            <div class="form-group row">
                <label for="gamepadId" class="col-3 col-form-label">Gamepad ID: </label>
                <input class="form-control" *ngIf="gamepad" class="col-9" [(ngModel)]="gamepad.id" name="gamepadId" id="gamepadId" readonly/>
                <input class="form-control" *ngIf="!gamepad" class="col-9" value="disconnected" name="gamepadId" id="gamepadId" readonly/>
            </div>
            <div class="form-group row">
                <button type="button" class="btn btn-warning" [disabled]="!gamepad" (click)="resetConfiguration()">Reset Configuration</button>
            </div>

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

    resetConfiguration() {
        this.carlpadGamepadService.resetConfiguration();
    }
}