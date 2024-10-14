import { Key } from './enums/key.js';
import { IConsoleData, IStorageData } from './interfaces/data.js';
import ApiWeather from './classes/api-weather.js';
import DataHelper from './helpers/data-helper.js';
import FileStorage from './classes/file-storage.js';
import IStorage from './interfaces/storage.js';
import WeatherData from './interfaces/weather.js';

class Weather {
  private fileStorage: IStorage;

  constructor() {
    this.fileStorage = new FileStorage();
  }

  public async init() {
    try {
      const consoleData = this.getConsoleData();
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

  private async saveDataToStorage(consoleData: IConsoleData) {
    const s = consoleData[Key.s];
    if (s) {
      await this.fileStorage.set(Key.s, s);
    }

    const t = consoleData[Key.t];
    if (t) {
      await this.fileStorage.set(Key.t, t);
    }
  }

  private async getDataFromStorage() {
    return this.fileStorage.getAll();
  }

  private async getWeatherData(storageData: IStorageData) {
    if (!storageData.s) {
      throw new Error('Enter city!');
    }

    if (!storageData.t) {
      throw new Error('Enter token!');
    }

    return new ApiWeather(storageData.s, storageData.t).get();
  }

  private renderWeatherData(weatherData: WeatherData) {
    console.log(weatherData);
  }
}

const weather = new Weather();
weather.init();
