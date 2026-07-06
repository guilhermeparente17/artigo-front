import { api } from "../api";

export async function deleteArticle(id: string) {
  console.log(id);
  const { data } = await api.delete(`/articles/${id}`);

  return data;
}
