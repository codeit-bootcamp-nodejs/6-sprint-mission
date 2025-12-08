import { User, Product, Article, Comment } from '@prisma/client';

export interface completeUser extends User {
  products?: Product[];
  articles?: Article[];
  comments?: Comment[];
  likedProducts?: Product[];
  likedArticles?: Article[];
}

export interface completeProduct extends Product {
  likedUsers?: User[];
  comments?: Comment[];
}

export interface completeArticle extends Article {
  likedUsers?: User[];
  comments?: Comment[];
}
