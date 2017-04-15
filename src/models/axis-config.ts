export class CarlpadAxisConfig {
  index: number;
  selected: boolean;
  inverted: boolean;

  constructor(index: number, selected: boolean, inverted: boolean) {
    this.index = index;
    this.selected = selected;
    this.inverted = inverted;
  }
}
