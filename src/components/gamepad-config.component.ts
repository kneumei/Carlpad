import { Component } from '@angular/core';

import { GamepadService } from '../services/gamepad.service';


@Component({
  selector: 'gamepad',
  template: './components/gamepad-config.component.html'
})
export class CarlpadGamepad {
  constructor(
    private carlpadGamepadService: GamepadService
  ) {
  }

  get gamepad(): Gamepad | undefined {
    return this.carlpadGamepadService.gamepad;
  }

  resetConfiguration() {
    this.carlpadGamepadService.resetConfiguration();
  }
}
