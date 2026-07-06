import type { User } from "../../store/authSotre";

export type Articles = {
  id: string;
  tags: string[];
  cover: string;
  title: string;
  content: string;
  user: User;

  createdAt: string;
};
