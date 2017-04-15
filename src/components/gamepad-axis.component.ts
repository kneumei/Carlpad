import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { round, find } from 'lodash';
import { Subscription } from 'rxjs';

import { GamepadService } from '../services/gamepad.service';
import { CarlpadAxisConfig } from '../models/axis-config';

@Component({
    selector: 'gamepad-axis',
    templateUrl: './components/gamepad-axis.component.html'
})
export class CarlpadGamepadAxis implements OnInit, OnDestroy {

    @Input() axisIndex: number;
    rawValue: number = 0;
    outputValue: number = 0;
    subscription: Subscription;

    constructor(private gamepadSerice: GamepadService) { }

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
        let found = find(this.gamepadSerice.gamepadConfig.axes, (axis) => axis.index === this.axisIndex);
        if (!found) {
            found = new CarlpadAxisConfig(this.axisIndex, false, false);
            this.gamepadSerice.gamepadConfig.axes.push(found);
        }
        return found;
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