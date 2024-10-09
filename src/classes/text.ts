import { Color } from '../enums/color.js';

export class Text {
  constructor(private data: any) {}

  public colorize(color?: Color) {
    this.data = color ? `\x1b[${color}m${this.data}\x1b[0m` : this.data;
    return this;
  }

  public br() {
    this.data = `${this.data}\n`;
    return this;
  }

  public get() {
    return this.data;
  }
}
