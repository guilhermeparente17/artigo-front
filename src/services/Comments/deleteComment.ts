import { api } from "../api";

export async function deleteComment(id: string) {
  const { data } = await api.delete(`/comments/${id}`);

  return data;
}
