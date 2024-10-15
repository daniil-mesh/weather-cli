import { Color } from './enums/color.js';
import { IConsoleData, IStorageData } from './interfaces/data.js';
import { Key } from './enums/key.js';
import { Output } from './classes/output.js';
import ApiWeather from './classes/api-weather.js';
import DataHelper from './helpers/data-helper.js';
import FileStorage from './classes/file-storage.js';
import IStorage from './interfaces/storage.js';
import Modifies from './helpers/modifies.js';
import IWeatherData from './interfaces/weather.js';

class Weather {
  private fileStorage: IStorage;

  constructor() {
    this.fileStorage = new FileStorage();
  }

  public async init() {
    try {
      const consoleData = this.getConsoleData();
      if (consoleData.h) {
        this.renderHelp();
        return;
      }
      await this.saveDataToStorage(consoleData);
      const storageData = await this.getDataFromStorage();
      const weatherData = await this.getWeatherData(storageData);
      this.renderWeatherData(weatherData);
    } catch (e) {
      if (!(e instanceof Error)) {
        return;
      }
      console.error(e.message);
    }
  }

  private getConsoleData() {
    return DataHelper.getConsoleData(process.argv);
  }

  private async saveDataToStorage(data: IConsoleData) {
    const s = data[Key.s];
    if (s) {
      await this.fileStorage.set(Key.s, s);
    }

    const t = data[Key.t];
    if (t) {
      await this.fileStorage.set(Key.t, t);
    }
  }

  private async getDataFromStorage() {
    return this.fileStorage.getData();
  }

  private async getWeatherData(data: IStorageData) {
    if (!data.s) {
      throw new Error('Enter city!');
    }

    if (!data.t) {
      throw new Error('Enter token!');
    }

    return new ApiWeather(data.s, data.t).get();
  }

  private renderHelp() {
    const modifies = [Modifies.colorize(Color.Yellow), Modifies.br()];
    const text = [
      new Output('-h to output help'),
      new Output('-s [CITY] to set the city'),
      new Output('-t [API_KEY] to save the token'),
      new Output('No parameters - weather output'),
    ];
    console.log(text.map((text) => text.get(...modifies)).join(''));
  }

  private renderWeatherData(data: IWeatherData) {
    const modifies = [Modifies.colorize(Color.Cyan), Modifies.br()];
    const pad: [number, string] = [15, ' '];

    const text = [
      new Output('City:'.padStart(...pad) + ' ' + data.name),
      new Output(
        'Weather:'.padStart(...pad) +
          ' ' +
          data.weather[0].main +
          ' - ' +
          data.weather[0].description
      ),
      new Output(
        'Temperature:'.padStart(...pad) +
          ' ' +
          data.main.temp +
          '° feels like ' +
          data.main.feels_like +
          '°'
      ),
      new Output(
        'Wind:'.padStart(...pad) +
          ' ' +
          data.wind.speed +
          ' m/s gusts up ' +
          data.wind.gust +
          ' m/s'
      ),
    ];

    console.log(text.map((text) => text.get(...modifies)).join(''));
  }
}

const weather = new Weather();
weather.init();
