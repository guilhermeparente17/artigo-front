import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, type CreateComment } from "../createComment";

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateComment) => createComment(payload),

    onSuccess: (_, articleId) => {
      // invalida detalhe do artigo
      queryClient.invalidateQueries({
        queryKey: ["article", articleId],
      });

      // invalida listas se precisar
      queryClient.invalidateQueries({
        queryKey: ["articles-me"],
      });
    },
  });
}
