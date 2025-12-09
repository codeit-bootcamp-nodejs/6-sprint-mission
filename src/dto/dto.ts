export interface createUserDTO {
  email: string;
  nickname: string;
  password: string;
}

export interface updateUserDTO {
  email?: string;
  nickname?: string;
  password?: string;
  imageUrls?: string;
}

export interface createProductDTO {
  name: string;
  description: string;
  price: number;
  tags: string[];
  userId: number;
}

export interface updateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  tags?: string[];
  imageUrls?: string;
  userId?: number;
}

export interface createArticleDTO {
  title: string;
  content: string;
  userId: number;
}

export interface updateArticleDTO {
  title?: string;
  content?: string;
  imageUrls?: string;
  userId?: number;
}

interface BaseComment {
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

export type createCommentDTO = ArticleComment | ProductComment;

export interface updateCommentDTO {
  content?: string;
  userId?: number;
  productId?: number;
  articleId?: number;
}
