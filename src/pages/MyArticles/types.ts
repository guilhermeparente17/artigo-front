import type { User } from "../../store/authSotre";

export type ArticlesMeTypes = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  content?: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
  likes: {
    userId: string;
    id: string;
  }[];
  comments: comments;
};

type comments = {
  id: string;
  content: string;
  user: User;
}[];

export type ArticleTypes = {
  id: string;
  title: string;
  likes: {
    userId: string;
    id: string;
  }[];
  description: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  tags: string[];
  cover: string;
  user: User;
  comments: comments;
  _count: {
    likes: number;
  };
};
