import { api } from "../api";

export async function deleteArticle(id: string) {
  const { data } = await api.delete(`/articles/${id}`);

  return data;
}
