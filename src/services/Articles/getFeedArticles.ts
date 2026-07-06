import { api } from "../api";

export async function getFeedArticles() {
  const { data } = await api.get("/articles");

  return data;
}
