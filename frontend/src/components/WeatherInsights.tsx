import { useMemo } from "react";

/**
 * Componente simples para gerar "insights" baseados apenas em lógica
 * sem uso de IA externa.
 *
 * Props esperadas:
 *  - data: Array<{ temperature: number, windspeed: number, rain: number }>
 */
// Definição do Tipo de Dados Climáticos
interface WeatherData {
  temperature: number;
  windspeed: number;
  rain?: number; 
}

interface WeatherInsightsProps {
    data: WeatherData[]; // 'data' é um Array de objetos WeatherData
}

export function WeatherInsights({ data = [] }:WeatherInsightsProps) {
  // Gera insights básicos usando regras fixas
  const insights = useMemo(() => {
    if (!data.length) return [];

    const temps = data.map((d) => d.temperature);
    const winds = data.map((d) => d.windspeed);
    const rains = data.map((d) => d.rain ?? 0);

    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const maxWind = Math.max(...winds);
    const rainChance = rains.some((r) => r > 0) ? "Alta" : "Baixa";

    const insightsList = [];

    // Insight 1 – Temperatura média
    if (avgTemp > 30) insightsList.push("A média de temperatura está alta hoje, prepare-se para calor.");
    else if (avgTemp < 18) insightsList.push("A média de temperatura está baixa, pode ser um dia frio.");
    else insightsList.push("Temperatura média agradável ao longo do dia.");

    // Insight 2 – Vento
    if (maxWind > 30) insightsList.push("Rajadas de vento fortes previstas, cuidado ao dirigir.");
    else if (maxWind > 15) insightsList.push("Vento moderado esperado ao longo do dia.");
    else insightsList.push("Pouco vento, condições estáveis.");

    // Insight 3 – Chuva
    if (rainChance === "Alta") insightsList.push("Chance elevada de chuva — leve guarda-chuva.");
    else insightsList.push("Baixa probabilidade de chuva.");

    return insightsList;
  }, [data]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-3">
      <h2 className="text-xl font-semibold">Insights Climáticos</h2>
      <ul className="list-disc ml-5 space-y-1">
        {insights.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
  );
}
