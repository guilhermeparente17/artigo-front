import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike } from "../createLike";
import { deleteLike } from "../deleteLike";

export function useCreateLike(articleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLike,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["show-article", articleId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["articles-me"],
        }),
      ]);
    },
  });
}

export function useDeleteLike(articleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, articleId }: { id: string; articleId: string }) =>
      deleteLike(id, articleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["show-article", articleId],
      });
    },
  });
}
