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

export interface CompleteArticle extends Article {
  likedUsers?: User[];
  comments?: Comment[];
}
