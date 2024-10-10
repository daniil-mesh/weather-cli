import { Arg } from '../enums/arg.js';
import IArgsData from '../interfaces/args-data.js';

export default class ArgsHelper {
  public static getArgsData(args: string[]): IArgsData {
    const result: IArgsData = {};
    const [, , ...rest] = args;
    rest.forEach((value, index, arr) => {
      if (value.charAt(0) === '-') {
        const char1 = value.charAt(1);
        switch (char1) {
          case Arg.h:
            result[Arg.h] = true;
            break;
          case Arg.s:
          case Arg.t:
            const next = arr.at(index + 1);
            result[char1] = next && next.charAt(0) !== '-' ? next : '';
            break;
        }
      }
    });
    return result;
  }
}
