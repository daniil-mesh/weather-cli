import { Arg } from '../enums/arg.js';

export default interface ArgsData {
  [Arg.h]?: boolean;
  [Arg.s]?: string;
  [Arg.t]?: string;
}
