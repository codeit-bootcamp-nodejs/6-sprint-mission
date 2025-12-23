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
export type ProductListToShow = Pick<Product, 'id' | 'name' | 'price' | 'createdAt'>;
export type ProductToShow = { isLiked: Boolean } & Product;

export interface CompleteArticle extends Article {
  likedUsers?: User[];
  comments?: Comment[];
}

export type ArticleList2show = Pick<Article, 'id' | 'title' | 'content' | 'createdAt'>;
export type Article2show = Omit<Article, 'comments' | 'likedUsers'> & {
  comments?: string[];
  likedUsers?: string[];
};

export type LikedArticle2show = { isLiked: Boolean } & Article2show;

export type CommentWithNextCursor = { comments: Comment[]; nextCursor: number | null };

type CommentBase = Pick<Comment, 'id' | 'content' | 'createdAt' | 'userId'>;

export type Comment2show =
  | (CommentBase & { articleId: number | null })
  | (CommentBase & { productId: number | null });

export type TokenType = { accessToken: string | undefined; refreshToken: string | undefined };
