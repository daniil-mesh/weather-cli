import { IConsoleData } from '../interfaces/data.js';
import { Key } from '../enums/key.js';

export default class DataHelper {
  public static getConsoleData(args: string[]): IConsoleData {
    const result: IConsoleData = {};
    const [, , ...rest] = args;
    rest.forEach((value, index, arr) => {
      if (value.charAt(0) === '-') {
        const char1 = value.charAt(1);
        switch (char1) {
          case Key.h:
            result[Key.h] = true;
            break;
          case Key.s:
          case Key.t:
            const next = arr.at(index + 1);
            result[char1] = next && next.charAt(0) !== '-' ? next : '';
            break;
        }
      }
    });
    return result;
  }
}
