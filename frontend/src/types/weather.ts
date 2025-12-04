// types/weather.ts

export interface WeatherRaw {
  is_day: number;          // 1 dia / 0 noite
  latitude: number;
  longitude: number;
  temperature: number;
  time: string;            // "2025-12-03T21:30"
  weathercode: number;     // "wmo code"
  winddirection: number;
  windspeed: number;
}

export interface WeatherData {
  _id: string;
  raw: WeatherRaw;
  timestamp: string;       // igual ao raw.time
  meta: any | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


