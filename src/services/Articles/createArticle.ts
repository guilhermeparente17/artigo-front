import { api } from "../api";

type CreateArticle = {
  payload: {
    title: string;
    description: string;
    content: string;
    tags: string[];
    cover: string;
  };
};

export async function createArticle({ payload }: CreateArticle) {
  const { data } = await api.post("/articles", payload);

  return data;
}
