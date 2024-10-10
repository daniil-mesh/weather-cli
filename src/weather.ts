import { Arg } from './enums/arg.js';
import ArgsHelper from './helpers/args-helper.js';
import ArgsStorage from './classes/args-storage.js';
import IArgsStorage from './interfaces/args-storage.js';

class Weather {
  private argsStorage: IArgsStorage;

  constructor() {
    this.argsStorage = new ArgsStorage();
  }

  public async init() {
    let argsData = ArgsHelper.getArgsData(process.argv);

    const s = argsData[Arg.s];
    if (s) {
      await this.argsStorage.setArg(Arg.s, s);
    }

    const t = argsData[Arg.t];
    if (t) {
      await this.argsStorage.setArg(Arg.t, t);
    }

    argsData = await this.argsStorage.getData();
    console.log(argsData);
  }
}

const weather = new Weather();
weather.init();
