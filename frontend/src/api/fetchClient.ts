const API_BASE = import.meta.env.VITE_API_BASE;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro desconhecido" }));
    throw new Error(error.message || "Erro na requisição");
  }

  return response.json();
}
