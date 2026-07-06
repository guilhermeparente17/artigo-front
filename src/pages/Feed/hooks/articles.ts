import { useQuery } from "@tanstack/react-query";
import type { Articles } from "../types";
import { getFeedArticles } from "../../../services/Articles/getFeedArticles";

export const useArticles = () =>
  useQuery<Articles[]>({
    queryKey: ["articles"],
    queryFn: getFeedArticles,
  });
