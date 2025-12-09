import BadRequestError from './errors/BadRequestError';
import userRepo from '../repository/user.repo';
import articleRepo from '../repository/article.repo';
import productRepo from '../repository/product.repo';
import commentRepo from '../repository/comment.repo';
import { Request, Response, NextFunction } from 'express';
import { User, Product, Article, Comment } from '@prisma/client';

async function authorizeUser(req: Request, res: Response, next: NextFunction) {
  try {
    let item;
    if (req.originalUrl.includes('users')) {
      const userItem = (await userRepo.findById(Number(req.params.id))) as User;
      item = { ...userItem, userId: userItem.id };
    } else if (req.originalUrl.includes('products')) {
      item = (await productRepo.findById(Number(req.params.id))) as Product;
    } else if (req.originalUrl.includes('articles')) {
      item = (await articleRepo.findById(Number(req.params.id))) as Article;
    } else if (req.originalUrl.includes('comments')) {
      item = (await commentRepo.findById(Number(req.params.id))) as Comment;
    } else {
      console.log('');
      console.log('Something went wrong');
      throw new BadRequestError('BADREQUEST');
    }

    // console.log('');
    // console.log(`Testing authorizeUser.js...`);
    // console.log(`ueq.user.id: ${req.user.id}`);
    // console.log(`item.userId: ${item.userId}`);
    // console.log('');

    if (req.user!.id !== item.userId) {
      console.log('');
      console.log('Unauthorized');
      throw new BadRequestError('UNAUTHORIZED');
    }
    next();
  } catch (err) {
    next(err);
  }
}

export default authorizeUser;
