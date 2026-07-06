import { api } from "../api";

type UpdateArticle = {
  payload: {
    title: string;
    description: string;
    content: string;
    tags: string[];
    cover: string;
    id: string;
  };
};

export async function updateArticle({ payload }: UpdateArticle) {
  const { data } = await api.patch(`/articles/${payload?.id}`, payload);

  return data;
}
