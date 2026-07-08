import { api } from "../api";

type Filters = {
  search?: string;
  author?: string;
  tag?: string;
  page?: number;
};

export async function getFeedArticles(filters: Filters) {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", String(filters.page));

  if (filters.search) params.append("search", filters.search);

  if (filters.author) params.append("author", filters.author);

  if (filters.tag) params.append("tag", filters.tag);

  const { data } = await api.get(`/articles?${params}`);

  return data;
}
