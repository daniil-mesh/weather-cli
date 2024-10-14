import { homedir } from 'os';
import { IStorageData } from '../interfaces/data.js';
import { join } from 'path';
import { promises } from 'fs';
import { StorageKey } from '../enums/key.js';
import IStorage from '../interfaces/storage.js';

export default class FileStorage implements IStorage {
  private fileExt = '.json';

  constructor(private fileName = 'weather-data') {}

  get filePath() {
    return join(homedir(), `${this.fileName}${this.fileExt}`);
  }

  public async getData() {
    let data: IStorageData = {};
    if (await this.isDataExist()) {
      const file = await promises.readFile(this.filePath);
      data = JSON.parse(file.toString());
    }
    return data;
  }

  public async get(key: StorageKey) {
    const data = await this.getData();
    return data[key];
  }

  public async set(key: StorageKey, value: string): Promise<void> {
    const data = await this.getData();
    data[key] = value;
    await promises.writeFile(this.filePath, JSON.stringify(data));
  }

  private async isDataExist() {
    try {
      await promises.stat(this.filePath);
      return true;
    } catch (e) {
      return false;
    }
  }
}
