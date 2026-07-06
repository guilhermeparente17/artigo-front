import { api } from "../api";

export async function createLike(id: string) {
  const { data } = await api.post(`/likes`, {
    articleId: id,
  });

  return data;
}
