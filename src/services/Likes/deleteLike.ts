import { api } from "../api";

export async function deleteLike(id: string, articleId: string) {
  const { data } = await api.delete(`/likes/${id}/article/${articleId}`);

  return data;
}
