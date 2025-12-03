import { useState } from "react";
import { getInsight } from "../api/weatherApi"; // você já registrou essa função

export interface InsightRequest {
  data: string;
}

export interface WeatherInsight {
  title: string;
  summary: string;
  opportunity: string;
  action: string;
}

export default function WeatherInsights({ data }: InsightRequest) {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<WeatherInsight | null>(null);
  const [error, setError] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setInsight(null);
    setError("");

    try {
      const response = await getInsight(data.trim());
      setInsight(response.insight); // <- aqui precisa garantir que insight está no formato WeatherInsight
    } catch (err) {
      setError("Erro ao gerar insight.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        padding: "20px",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: "16px",
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#333"
        }}
      >
        Weather Insights ☁️
      </h2>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "12px",
          background: loading ? "#999" : "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "0.2s"
        }}
      >
        {loading ? "Gerando insight..." : "Gerar Insight"}
      </button>

      {/* ERRO */}
      {error && (
        <p className="mt-4 text-red-500 font-medium text-center">
          {error}
        </p>
      )}

      {/* INSIGHT */}
      {insight && (
        <div className="p-4 mt-4 rounded-xl bg-white shadow-sm border space-y-2">
          <h2 className="text-lg font-semibold text-blue-600">
            {insight.title}
          </h2>

          <p className="text-gray-700">{insight.summary}</p>

          <div>
            <h3 className="font-medium text-gray-800">Oportunidade</h3>
            <p className="text-gray-600">{insight.opportunity}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-800">Ação Recomendada</h3>
            <p className="text-gray-600">{insight.action}</p>
          </div>
        </div>
      )}
    </div>
  );
}
