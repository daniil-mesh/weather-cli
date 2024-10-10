import { Color } from '../enums/color.js';
import { Modify } from '../types/modify.js';

export default class Modifies {
  public static colorize(color?: Color): Modify {
    return (data: any) => (color ? `\x1b[${color}m${data}\x1b[0m` : data);
  }

  public static br(): Modify {
    return (data: any) => `${data}\n`;
  }
}
