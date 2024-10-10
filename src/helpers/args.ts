import { Arg } from '../enums/arg.js';
import ArgsData from '../interfaces/args-data.js';

export default class Args {
  public static getArgs(args: string[]): ArgsData {
    const result: ArgsData = {};
    const [, , ...rest] = args;
    rest.forEach((value, index, arr) => {
      if (value.charAt(0) === '-') {
        switch (value.charAt(1)) {
          case Arg.s:
            const next = arr.at(index + 1);
            result[Arg.s] = next && next.charAt(0) !== '-' ? next : '';
            break;
          case Arg.h:
            result[Arg.h] = true;
        }
      }
    });
    return result;
  }
}
