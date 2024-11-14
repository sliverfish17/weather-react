export interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherData {
  name: string;
  id?: string;
  sys: { country: string };
  weather: IWeatherCondition[];
  main: { temp: number };
}
