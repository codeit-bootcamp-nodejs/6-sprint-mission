import userRepo from '../repository/user.repo';
import articleRepo from '../repository/article.repo';
import productRepo from '../repository/product.repo';
import commentRepo from '../repository/comment.repo';
import { Request, Response, NextFunction } from 'express';
import { User, Product, Article, Comment } from '@prisma/client';
import BadRequestError from './errors/BadRequestError';
import ForbiddenError from './errors/ForbiddenError';

async function authorize(req: Request, res: Response, next: NextFunction) {
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
      throw new BadRequestError('잘못된 요청입니다');
    }

    // console.log('');
    // console.log(`Testing authorizeUser.js...`);
    // console.log(`ueq.user.id: ${req.user.id}`);
    // console.log(`item.userId: ${item.userId}`);
    // console.log('');

    if (req.user.id !== item.userId) {
      console.log('');
      console.log('Forbidden');
      throw new ForbiddenError('권한이 없습니다');
    }
    next();
  } catch (err) {
    next(err);
  }
}

export default authorize;
