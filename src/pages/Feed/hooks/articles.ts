import { useQuery } from "@tanstack/react-query";
import { getFeedArticles } from "../../../services/Articles/getFeedArticles";
import type { ArticleTypes } from "../../MyArticles/types";

export const useArticles = () =>
  useQuery<ArticleTypes[]>({
    queryKey: ["articles"],
    queryFn: getFeedArticles,
  });
