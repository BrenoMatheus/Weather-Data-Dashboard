import { useEffect, useState } from "react";
import { getWeather } from "../api/weatherApi";
import { WeatherCard } from "../components/WeatherCard";
import { WeatherChart } from "../components/WeatherChart";
import { WeatherExportButtons } from "../components/WeatherExportButtons";
import WeatherInsights from "../components/WeatherInsights";
import { Navbar } from "../components/Navbar";

export default function HomePage() {
  const [weatherCards, setWeatherCards] = useState<any[]>([]);
  const [weatherCharts, setWeatherChart] = useState<any[]>([]);
  const [dataInsight, setDataInsight] = useState("");

  const [page, setPage] = useState(1);
  const limit = 20; // quantidade por página

  useEffect(() => {
    async function load() {
      try {
        const skip = (page - 1) * limit;
        const data = await getWeather(limit, skip);

        if (data.length === 0 && page > 1) {
          setPage((p) => p - 1);
          return;
        }

        const lastWeather = data[data.length - 1];

        const formatted = `
          Temperatura: ${lastWeather.temperature}°C
          Vento: ${lastWeather.windspeed} km/h
          Horário: ${lastWeather.timestamp}
          Código do clima (WMO): ${lastWeather.raw?.current_weather?.weathercode}
          Latitude: ${lastWeather.raw?.latitude}
          Longitude: ${lastWeather.raw?.longitude}
        `;

        setDataInsight(formatted);
        setWeatherCards(data);

        setWeatherChart(
          data.map((item: any) => ({
            timestamp: item.timestamp,
            temperature: item.temperature,
            windspeed: item.windspeed,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [page]); // recarrega ao mudar de página

  return (
    <>
      <Navbar />
      <div className="bg-slate-300 p-6">

        {/* CHART */}
        <div className="w-full p-2 mb-4">
          <WeatherChart data={weatherCharts} />
        </div>

        {/* INSIGHTS */}
        <div className="w-full p-2">
          <WeatherInsights data={dataInsight} />
        </div>

        {/* EXPORT */}
        <div className="w-full pr-2 pt-2 flex justify-end">
          <WeatherExportButtons />
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 my-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-400"
          >
            ← Anterior
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-blue-700 text-white rounded"
          >
            Próxima →
          </button>
        </div>

        {/* WEATHER CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
          {weatherCards.map((weatherCard: any) => (
            <WeatherCard key={weatherCard._id} data={weatherCard} />
          ))}
        </div>
      </div>
    </>
  );
}
