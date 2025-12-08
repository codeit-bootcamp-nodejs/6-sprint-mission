export interface createUserDTO {
  email: string;
  nickname: string;
  password: string;
}

export interface updateUserDTO {
  email?: string;
  nickname?: string;
  password?: string;
}

export interface createProductDTO {
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export interface updateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  tags?: string[];
}

export interface createArticleDTO {
  title: string;
  content: string;
  userId: number;
}

export interface updateArticleDTO {
  title?: string;
  content?: string;
  userId?: number;
}

interface BaseComment {
  id: string;
  content: string;
  userId: number;
}

interface ArticleComment extends BaseComment {
  articleId: number;
  productId: null;
}

interface ProductComment extends BaseComment {
  articleId: null;
  productId: number;
}

export type Comment = ArticleComment | ProductComment;
