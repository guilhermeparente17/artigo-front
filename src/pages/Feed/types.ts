export type ArticlesTypes = {
  id: string;
  tags: string[];
  cover: string;
  title: string;
  content: string;
  user: {
    name: string;
  };
  createdAt: string;
};
