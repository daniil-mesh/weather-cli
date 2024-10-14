import { Client } from 'undici';
import WeatherData from '../interfaces/weather.js';

export default class ApiWeather {
  client: Client;

  constructor(
    private city: string,
    private key: string,
    private units: string = 'metric'
  ) {
    this.client = new Client('https://api.openweathermap.org');
  }

  public async get(): Promise<WeatherData> {
    const data = await this.client.request({
      path: `/data/2.5/weather?q=${this.city}&appid=${this.key}&units=${this.units}`,
      method: 'GET',
    });

    const json = await data.body.json();
    return json as WeatherData;
  }
}
