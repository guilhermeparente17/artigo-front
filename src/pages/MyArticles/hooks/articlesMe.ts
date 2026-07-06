import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticlesMe } from "../../../services/Articles/getArticlesMe";
import type { ArticleDetail, ArticlesMeTypes } from "../types";
import { getShowArticles } from "../../../services/Articles/showArticle";
import { deleteArticle } from "../../../services/Articles/deleteArticle";

export const useArticlesMe = () =>
  useQuery<ArticlesMeTypes[]>({
    queryKey: ["articles-me"],
    queryFn: getArticlesMe,
  });

export const useShowArticle = (id: string) =>
  useQuery<ArticleDetail>({
    queryKey: ["show-article", id],
    queryFn: () => getShowArticles(id!),
    enabled: !!id,
  });

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteArticle(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles-me"],
      });
    },
  });
};
