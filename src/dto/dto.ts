export interface CreateUserDto {
  email: string;
  nickname: string;
  password: string;
}

export interface UpdateUserDto {
  email?: string;
  nickname?: string;
  password?: string;
  imageUrls?: string[];
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  tags: string[];
  userId: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  tags?: string[];
  imageUrls?: string[];
  userId?: number;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  userId: number;
}

export interface UpdateArticleDto {
  title?: string;
  content?: string;
  imageUrls?: string[];
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

export type CreateCommentDTO = ArticleComment | ProductComment;

export interface UpdateCommentDto {
  content?: string;
  userId?: number;
  productId?: number;
  articleId?: number;
}
