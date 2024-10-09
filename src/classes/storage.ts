import { homedir } from 'os';
import { join } from 'path';

export default class Storage {
  private file = 'weather-data.json';

  save(key: string, value: JSON) {
    join(homedir(), this.file);
  }

  load(key: string): JSON {
    return JSON.parse('');
  }
}
