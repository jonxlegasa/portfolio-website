export type KnownTag = 'personal' | 'math' | 'physics' | 'ai/ml' | 'chess';

export type BlogPost = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
};
