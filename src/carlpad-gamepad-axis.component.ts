import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { round, find } from 'lodash';
import { Subscription } from 'rxjs';

import { CarlpadGamepadService } from './carlpad-gamepad.service';
import { CarlpadAxisConfig } from './carlpad-axis-config';

@Component({
    selector: 'carlpad-gamepad-axis',
    template: `
<div class="card" style="width: 20rem;">
    <div class="card-header">
    Axis: {{axisIndex}}
    <span class="pull-right" >
        <label>
            Selected: <input type="checkbox" [ngModel]="axisConfig.selected" (ngModelChange)="saveSelected($event)" >
        </label>
    </span>
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
        <div class="col-9">Invert: </div>
        <div class="col-3">
             <input type="checkbox" [ngModel]="axisConfig.inverted" (ngModelChange)="saveInverted($event)" >
        </div>
    </li>
  </ul>
</div>
    `
})
export class CarlpadGamepadAxis implements OnInit, OnDestroy {

    @Input() axisIndex: number;
    rawValue: number = 0;
    outputValue: number = 0;
    subscription: Subscription;

    constructor(private gamepadSerice: CarlpadGamepadService) { }

    ngOnInit() {
        this.subscription = this.gamepadSerice.gamepadObservable.subscribe((gamepad) => {
            if (gamepad) {
                this.rawValue = round(gamepad.axes[this.axisIndex], 2);
                this.outputValue = this.gamepadSerice.toOutputValue(this.rawValue, this.axisConfig);
            }
        })
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    get axisConfig(): CarlpadAxisConfig {
        return find(
            this.gamepadSerice.gamepadConfig.axes, (axis) => axis.index === this.axisIndex)
            || new CarlpadAxisConfig(this.axisIndex, false, false);
    }

    saveInverted(newValue: boolean) {
        this.axisConfig.inverted = newValue;
        this.gamepadSerice.saveConfiguration();
    }

    saveSelected(newValue: boolean) {
        this.axisConfig.selected = newValue;
        this.gamepadSerice.saveConfiguration();
    }
}