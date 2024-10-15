import { IStorageData } from './data.js';
import { StorageKey } from '../enums/key.js';

export default interface IStorage {
  readonly filePath: string;

  getData(): Promise<IStorageData>;

  get(key: StorageKey): Promise<string | undefined>;

  set(key: StorageKey, value: string): Promise<void>;
}
