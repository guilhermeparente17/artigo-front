import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Não envia o token para as rotas de autenticação
  const authRoutes = ["/auth/login", "/auth/register"];

  const isAuthRoute = authRoutes.some((route) => config.url?.includes(route));

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
