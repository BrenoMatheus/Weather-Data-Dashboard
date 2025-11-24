import { useEffect, useState } from "react";
import { getWeather } from "../api/weatherApi";
import { WeatherCard } from "../components/WeatherCard";
import { WeatherChart } from "../components/WeatherChart";
import { WeatherInsights } from "../components/WeatherInsights";
import { WeatherExportButtons } from "../components/WeatherExportButtons";
import { LogoutButton } from "../components/LogoutButton";


export default function HomePage() {
  const [weatherCards, setWeatherCards] = useState([]);
  const [weatherCharts, setWeatherChart] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWeather();
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
  }, []);

  return (
    <div className="bg-slate-300 p-6">

      {/* LOGOUT */}
      <div className="flex justify-end pr-2">
        <LogoutButton />
      </div>
      
      {/* CHART */}
      <div className="w-full p-2 mb-4">
        <WeatherChart data={weatherCharts} />
      </div>

      {/* INSIGHTS */}
      <div className="w-full p-2 ">
        <WeatherInsights data={weatherCards} />
      </div>

      {/* EXPORT */}
      <div className="w-full pr-2 pt-2 flex justify-end">
        <WeatherExportButtons />
      </div>

      {/* WEATHER CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        {weatherCards.map((weatherCard: any) => (
          <WeatherCard key={weatherCard._id} data={weatherCard} />
        ))}
      </div>
    </div>
  );
}
