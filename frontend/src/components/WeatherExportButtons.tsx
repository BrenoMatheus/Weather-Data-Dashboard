const API_BASE = import.meta.env.VITE_API_BASE; // Certo para Vite

export function WeatherExportButtons() {
  function downloadFile(url: string, filename: string) {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch((err) => console.error("Erro ao baixar arquivo:", err));
  }

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() =>
          downloadFile(`${API_BASE}/weather/export/csv`, "weather.csv")
        }
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Exportar CSV
      </button>

      <button
        onClick={() =>
          downloadFile(`${API_BASE}/weather/export/xlsx`, "weather.xlsx")
        }
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Exportar XLSX
      </button>
    </div>
  );
}
