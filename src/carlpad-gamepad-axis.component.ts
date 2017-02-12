import { Component, Input, OnInit } from '@angular/core';
import { round } from 'lodash';

import { CarlpadGamepadService } from './carlpad-gamepad.service';

@Component({
    selector: 'carlpad-gamepad-axis',
    template: `
<div class="card" style="width: 20rem;">
    <div class="card-header">
    Axis: {{axisIndex}}
    </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
        <div class="col-9">Raw Value: </div>
        <div class="col-3">{{rawValue}}</div>
    </li>
    <li class="list-group-item">
        <div class="col-9">Output Value: </div>
        <div class="col-3">{{outputValue}}</div>
    </li>
    <li class="list-group-item">
        <div class="col-9">Reverse: </div>
        <div class="col-3">
            <input type="checkbox" ([ngModel])="reverse">
        </div>
    </li>
  </ul>
</div>
    `
})
export class CarlpadGamepadAxis implements OnInit {
    @Input() axisIndex: number;
    rawValue: number = 0;
    outputValue: number = 0;

    constructor(private gamepadSerice: CarlpadGamepadService) { }

    ngOnInit() {
        this.gamepadSerice.gamepadObservable.subscribe((gamepad) => {
            if (gamepad) {
                this.rawValue = round(gamepad.axes[this.axisIndex], 2);
                this.outputValue = this.gamepadSerice.toOutputValue(this.rawValue);
            }
        })
    }

    reverse: boolean = false;
}