import { Color } from './enums/color.js';
import { Text } from './classes/text.js';
import Args from './helpers/args.js';

class Weather {
  public init() {
    const argsData = Args.getArgs(process.argv);
    console.log(new Text('sadasdas').colorize(Color.Cyan).br().get());
  }
}

const weather = new Weather();
weather.init();
