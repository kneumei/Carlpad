import { Component } from '@angular/core';

import { CarlpadGamepadService } from './carlpad-gamepad.service';

@Component({
    selector: 'carlpad-gamepad',
    template: `
<div class="card">
    <div class="card-header">
        <h2> CARLBot Gamepad</h2>
    </div>
    <div class="card-block">
        {{isGamepadConnected}}
    </div>
</div>
`
})
export class CarlpadGamepad {
    constructor(
        private carlpadGamepadService: CarlpadGamepadService
    ) {
    }

    get isGamepadConnected() {
        return this.carlpadGamepadService.isConnected;
    }
}