import { api } from "../api";

export async function getShowArticles(id: string) {
  const { data } = await api.get(`/articles/${id}`);

  return data;
}
