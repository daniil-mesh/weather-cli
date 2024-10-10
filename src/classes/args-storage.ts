import { Arg } from '../enums/arg.js';
import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import IArgsData from '../interfaces/args-data.js';
import IArgsStorage from '../interfaces/args-storage.js';

export default class ArgsStorage implements IArgsStorage {
  private fileExt = '.json';

  constructor(private fileName = 'weather-data') {}

  get filePath() {
    return join(homedir(), `${this.fileName}${this.fileExt}`);
  }

  public async getData() {
    let data: IArgsData = {};
    if (await this.isDataExist()) {
      const file = await promises.readFile(this.filePath);
      data = JSON.parse(file.toString());
    }
    return data;
  }

  public async getArg(key: Arg) {
    const data = await this.getData();
    return data[key];
  }

  public async setArg(key: typeof Arg.h, value: boolean): Promise<void>;
  public async setArg(key: typeof Arg.s, value: string): Promise<void>;
  public async setArg(key: typeof Arg.t, value: string): Promise<void>;
  public async setArg(key: Arg, value: boolean | string): Promise<void> {
    const data = await this.getData();

    switch (key) {
      case Arg.h:
        if (typeof value === 'boolean') {
          data[key] = value;
        }
        break;
      case Arg.s:
      case Arg.t:
        if (typeof value === 'string') {
          data[key] = value;
        }
        break;
      default:
        const _: never = key;
        throw new Error('wrong key');
    }

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
