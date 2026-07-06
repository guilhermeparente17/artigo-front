import { api } from "../api";

export type CreateComment = {
  payload: {
    content: string;
    articleId: string;
  };
};

export async function createComment({ payload }: CreateComment) {
  const { data } = await api.post("/comments", payload);

  return data;
}
