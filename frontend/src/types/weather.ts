// types/weather.ts
export interface CurrentWeather {
  interval: number;
  is_day: number;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
}

export interface WeatherRaw {
  current_weather: CurrentWeather;
  current_weather_units: {
    interval: string;
    is_day: string;
    temperature: string;
    time: string;
    weathercode: string;
    winddirection: string;
    windspeed: string;
  };
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export interface WeatherData {
  _id: string;
  raw: WeatherRaw;
  temperature: number;
  windspeed: number;
  timestamp: string;
  meta: any | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

