import { useQuery } from "@tanstack/react-query";
import { getFeedArticles } from "../../../services/Articles/getFeedArticles";
import type { ArticleTypes } from "../../MyArticles/types";

export const useArticles = (filters: {
  page: number;
  search: string;
  author: string;
  tag: string;
}) =>
  useQuery<ArticleTypes>({
    queryKey: ["articles", filters],
    queryFn: () => getFeedArticles(filters),
  });
