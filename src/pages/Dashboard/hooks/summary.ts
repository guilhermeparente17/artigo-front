import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../../../services/Users/Users";

type SummaryItems = {
  users: number;
  likes: number;
  comments: number;
  articles: number;
};
export const useSummary = () =>
  useQuery<SummaryItems>({
    queryKey: ["summary"],
    queryFn: getSummary,
  });
