import { useQuery } from "@tanstack/react-query";
import type { ArticlesTypes } from "../types";
import { getFeedArticles } from "../../../services/Articles/getFeedArticles";

export const useArticles = () =>
  useQuery<ArticlesTypes[]>({
    queryKey: ["articles"],
    queryFn: getFeedArticles,
  });
