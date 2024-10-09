import { Flag } from '../enums/flag.js';
import ArgsData from '../interfaces/args-data.js';

export default class Args {
  public static getArgs(args: string[]): ArgsData {
    const result: ArgsData = {};
    const [, , ...rest] = args;
    rest.forEach((value, index, arr) => {
      if (value.charAt(0) === '-') {
        switch (value.charAt(1)) {
          case Flag.s:
            const next = arr.at(index + 1);
            result[Flag.s] = next && next.charAt(0) !== '-' ? next : '';
            break;
          case Flag.h:
            result[Flag.h] = true;
        }
      }
    });
    return result;
  }
}
