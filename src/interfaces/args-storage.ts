import { Arg } from '../enums/arg.js';
import IArgsData from './args-data.js';

export default interface IArgsStorage {
  readonly filePath: string;

  getData(): Promise<IArgsData>;

  getArg(key: Arg): Promise<string | boolean | undefined>;

  setArg(key: typeof Arg.h, value: boolean): Promise<void>;
  setArg(key: typeof Arg.s, value: string): Promise<void>;
  setArg(key: typeof Arg.t, value: string): Promise<void>;
  setArg(key: Arg, value: boolean | string): Promise<void>;
}
