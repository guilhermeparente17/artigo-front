import { api } from "../api";

export async function getArticlesMe() {
  const { data } = await api.get("/articles/me");

  return data;
}
