import { Component } from '@angular/core';

@Component({
  selector: 'carlpad-connection',
  templateUrl: 'carlpad-connection.component.html'
})
export class CarlpadConnection {
  selectedConnectionType = 'wifi';
  connectionTypes = ['wifi', 'serial']
}