import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Sun, CloudSun, Cloud, Wind, Thermometer } from "lucide-react";
import type { WeatherData } from "../types/weather";

type Props = {
  data: WeatherData;
};

function getWeatherIcon(code: number) {
  if (code === 0) return <Sun className="w-10 h-10 text-yellow-500" />;
  if ([1, 2].includes(code)) return <CloudSun className="w-10 h-10 text-yellow-400" />;
  if ([3, 45, 48].includes(code)) return <Cloud className="w-10 h-10 text-gray-500" />;

  return <Cloud className="w-10 h-10" />;
}

export function WeatherCard({ data }: Props) {
  const w = data.raw;

  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl shadow-lg p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold text-blue-900">
          Previsão Atual
        </CardTitle>

        {getWeatherIcon(w.weathercode)}
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 text-blue-900">
        {/* Temperatura */}
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5" />
          <div>
            <p className="text-sm text-blue-600">Temperatura</p>
            <p className="text-xl font-bold">{w.temperature}°C</p>
          </div>
        </div>

        {/* Vento */}
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5" />
          <div>
            <p className="text-sm text-blue-600">Vento</p>
            <p className="text-xl font-bold">{w.windspeed} km/h</p>
          </div>
        </div>

        {/* Status Dia/Noite */}
        <div className="col-span-2 flex justify-between mt-2">
          <div>
            <p className="text-sm text-blue-600">Direção do Vento</p>
            <p className="text-xl font-bold">{w.winddirection}°</p>
          </div>

          <div>
            <p className="text-sm text-blue-600">Dia / Noite</p>
            <p className="text-xl font-bold">
              {w.is_day === 1 ? "☀ Dia" : "🌙 Noite"}
            </p>
          </div>
        </div>

        {/* Data */}
        <p className="col-span-2 text-center text-sm text-blue-700 opacity-70 mt-2">
          {new Date(w.time).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
