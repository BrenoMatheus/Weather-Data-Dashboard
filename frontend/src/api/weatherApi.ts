// Lê URL base do .env (Vite exige prefixo VITE_)
const API_BASE = import.meta.env.VITE_API_BASE;

// Função auxiliar para pegar o token salvo no localStorage
function getAuthToken() {
  return localStorage.getItem("token");
}

// GET Weather
export async function getWeather() {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE}/weather`, {
    headers: {
      "Authorization": token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar weather");
  return res.json();
}

// POST Weather
export async function createWeather(data: any) {
  const token = getAuthToken();

  const res = await fetch(`${API_BASE}/weather`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao enviar weather");

  return res.json();
}

