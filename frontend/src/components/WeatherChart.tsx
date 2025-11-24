
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface WeatherChartPoint {
  timestamp: string;      // ex: "2025-11-21T17:15"
  temperature: number;    // ex: 30.3
  windspeed: number;      // ex: 11
}

interface WeatherChartProps {
  data: WeatherChartPoint[];
}

export function WeatherChart({ data }: WeatherChartProps) {
  // Ajusta datas para exibição mais bonita
  const formatted = data.map((d) => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <div className="w-full h-[350px] rounded-xl border p-4 bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">Previsão — Temperatura & Vento</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
            name="Temperatura (°C)"
          />

          <Line
            type="monotone"
            dataKey="windspeed"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Vento (km/h)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
