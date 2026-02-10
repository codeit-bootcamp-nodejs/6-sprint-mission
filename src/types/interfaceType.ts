import { User, Product, Article, Comment } from '@prisma/client';

export interface CompleteUser extends User {
  products?: Product[];
  articles?: Article[];
  comments?: Comment[];
  likedProducts?: Product[];
  likedArticles?: Article[];
}

export type SafeUser = Omit<User, 'password'>;
export type SafeCompleteUser = Omit<CompleteUser, 'password'>;

export interface CompleteProduct extends Product {
  likedUsers?: User[];
  comments?: Comment[];
}
export type ProductList2show = Pick<Product, 'id' | 'name' | 'price' | 'createdAt'>;
export type Product2show = Omit<Product, 'comments' | 'likedUsers'> & {
  comments?: string[];
  likedUsers?: string[];
};
export type LikedProduct2show = { isLiked: boolean } & Product2show;

export interface CompleteArticle extends Article {
  likedUsers?: User[];
  comments?: Comment[];
}

export type ArticleList2show = Pick<Article, 'id' | 'title' | 'content' | 'createdAt'>;
export type Article2show = Omit<Article, 'comments' | 'likedUsers'> & {
  comments?: string[];
  likedUsers?: string[];
};

export type LikedArticle2show = { isLiked: boolean } & Article2show;

type CommentWithoutNull = {
  id: number;
  content: string;
  userId: number;
  productId?: number;
  articleId?: number;
  createdAt: Date;
  updatedAt: Date;
};
export type CommentWithNextCursor = { comments: CommentWithoutNull[]; nextCursor: number | null };

type CommentBase = Pick<Comment, 'id' | 'content' | 'createdAt' | 'userId'>;

export type Comment2show =
  | (CommentBase & { articleId: number | null })
  | (CommentBase & { productId: number | null });

export type TokenType = { accessToken: string | undefined; refreshToken: string | undefined };

interface ImageFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
}

export interface ImagePostInput {
  path: string;
  targetId: number;
  protocol: string;
  host?: string;
  file: ImageFile;
}
