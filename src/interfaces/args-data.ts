import { Arg } from '../enums/arg.js';

export default interface IArgsData {
  [Arg.h]?: boolean;
  [Arg.s]?: string;
  [Arg.t]?: string;
}
