import { Key } from '../enums/key.js';

export interface IStorageData {
  [Key.s]?: string;
  [Key.t]?: string;
}

export interface IConsoleData extends IStorageData {
  [Key.h]?: boolean;
}
