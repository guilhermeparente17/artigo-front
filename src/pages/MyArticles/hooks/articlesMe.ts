import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticlesMe } from "../../../services/Articles/getArticlesMe";
import { getShowArticles } from "../../../services/Articles/showArticle";
import { deleteArticle } from "../../../services/Articles/deleteArticle";
import { deleteComment } from "../../../services/Comments/deleteComment";
import type { Articles, ArticleTypes } from "../types";

export const useArticlesMe = (filters: {
  page: number;
  search: string;
  author: string;
  tag: string;
}) =>
  useQuery<ArticleTypes>({
    queryKey: ["articles-me", filters],
    queryFn: () => getArticlesMe(filters),
  });

export const useShowArticle = (id: string) =>
  useQuery<Articles>({
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

export function useDeleteComment(articleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),

    onSuccess: () => {
      // Atualiza a tela de detalhes do artigo
      queryClient.invalidateQueries({
        queryKey: ["show-article", articleId],
      });

      // Caso tenha listagem de artigos
      queryClient.invalidateQueries({
        queryKey: ["articles-me"],
      });
    },
  });
}
