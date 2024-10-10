import DataStorage from './classes/args-storage.js';
import { Arg } from './enums/arg.js';

class Weather {
  public async init() {
    // const argsData = Args.getArgs(process.argv);
    await new DataStorage().set(Arg.h, false);
    await new DataStorage().set(Arg.s, 'Moscow');
    console.log(await new DataStorage().get(Arg.s));
  }
}

const weather = new Weather();
weather.init();
