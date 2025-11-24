import { apiFetch } from "./fetchClient";

export function login(email: string, password: string) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

export function registerUser(name: string, email: string, password: string) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

