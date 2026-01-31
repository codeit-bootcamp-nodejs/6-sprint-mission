import authorize from '../src/middleware/authorize'; // 네 경로에 맞게 수정
import BadRequestError from '../src/middleware/errors/BadRequestError';
import ForbiddenError from '../src/middleware/errors/ForbiddenError';
import userRepo from '../src/repository/user.repo';
import productRepo from '../src/repository/product.repo';
import articleRepo from '../src/repository/article.repo';
import commentRepo from '../src/repository/comment.repo';
import { Request, Response } from 'express';

// jest.mock('', () => ({
//   default: { findById: jest.fn() }
// }));
jest.mock('../src/repository/user.repo');
jest.mock('../src/repository/product.repo');
jest.mock('../src/repository/article.repo');
jest.mock('../src/repository/comment.repo');

const req = {
  originalUrl: '/articles/1',
  params: { id: '1' },
  user: { id: 1 }
};

const res = {};

describe('authorize middleware', () => {
  const next = jest.fn();

  beforeEach(() => {
    next.mockClear();
    (userRepo.findById as jest.Mock).mockReset();
    (productRepo.findById as jest.Mock).mockReset();
    (articleRepo.findById as jest.Mock).mockReset();
    (commentRepo.findById as jest.Mock).mockReset();
  });

  test('/users/:id 본인이면 next() 호출', async () => {
    (userRepo.findById as jest.Mock).mockResolvedValue({ id: 7 });

    const req = { originalUrl: '/users/7', params: { id: '7' }, user: { id: 7 } };
    const res = {};

    await authorize(req as unknown as Request, res as Response, next);
    expect(userRepo.findById).toHaveBeenCalledWith(7);
    expect(productRepo.findById).not.toHaveBeenCalledWith();
    expect(articleRepo.findById).not.toHaveBeenCalled();
    expect(commentRepo.findById).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
  test('/users/:id 타인이면 next(err)로 403 ForbiddenError 전달', async () => {
    (userRepo.findById as jest.Mock).mockResolvedValue({ userId: 1 });

    const req = { originalUrl: '/users/5', params: { id: '5' }, user: { id: 2 } };
    const res = {};

    await authorize(req as unknown as Request, res as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(ForbiddenError);
    expect(err.statusCode).toBe(403);
    expect(err.message).toBe('권한이 없습니다');
  });

  test('/products/:id 상품 등록자이면 통과 next() 호출', async () => {
    (productRepo.findById as jest.Mock).mockResolvedValue({ userId: 3 });

    const req = { originalUrl: '/products/1', params: { id: '1' }, user: { id: 3 } };
    const res = {};

    await authorize(req as unknown as Request, res as Response, next);

    expect(productRepo.findById).toHaveBeenCalledWith(1);
    expect(articleRepo.findById).not.toHaveBeenCalled();
    expect(userRepo.findById).not.toHaveBeenCalled();
    expect(commentRepo.findById).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  test('/products/:id 상품 등록자가 아니면 ForbiddenError를 next(err)로 전달', async () => {
    (productRepo.findById as jest.Mock).mockResolvedValue({ userId: 1 });

    const req = { originalUrl: '/products/5', params: { id: '5' }, user: { id: 2 } };
    const res = {};

    await authorize(req as unknown as Request, res as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(ForbiddenError);
    expect(err.statusCode).toBe(403);
    expect(err.message).toBe('권한이 없습니다');
  });

  test('/articles/:id r게시글 작성자면 통과 next() 호출', async () => {
    (articleRepo.findById as jest.Mock).mockResolvedValue({ userId: 1 });

    const req = { originalUrl: '/articles/4', params: { id: '4' }, user: { id: 1 } };
    const res = {};

    await authorize(req as unknown as Request, res as Response, next);

    expect(articleRepo.findById).toHaveBeenCalledWith(4);
    expect(productRepo.findById).not.toHaveBeenCalled();
    expect(userRepo.findById).not.toHaveBeenCalled();
    expect(commentRepo.findById).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  // test('/articles/:id 게시글 작성자 아니면 ForbiddenError를 next(err)로 전달', async () => {
  //   (articleRepo.findById as jest.Mock).mockResolvedValue({ userId: 1 });

  //   const req = { originalUrl: '/articles/5', params: { id: '5' }, user: { id: 2 } };
  //   const res = {};

  //   await authorize(req as unknown as Request, res as Response, next);

  //   expect(next).toHaveBeenCalledTimes(1);
  //   const err = next.mock.calls[0][0];
  //   expect(err).toBeInstanceOf(ForbiddenError);
  //   expect(err.statusCode).toBe(403);
  //   expect(err.message).toBe('권한이 없습니다');
  // });

  test('/comments/:id 댓글 작성자이면 통과 next() 호출', async () => {
    (commentRepo.findById as jest.Mock).mockResolvedValue({ userId: 10 });

    const req = { originalUrl: '/comments/1', params: { id: '1' }, user: { id: 10 } };
    const res = {};

    await authorize(req as unknown as Request, res as Response, next);

    expect(commentRepo.findById).toHaveBeenCalledWith(1);
    expect(productRepo.findById).not.toHaveBeenCalled();
    expect(userRepo.findById).not.toHaveBeenCalled();
    expect(articleRepo.findById).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  // test('/comments/:id 댓글 작성자 아니면 ForbiddenError를 next(err)로 전달', async () => {
  //   (commentRepo.findById as jest.Mock).mockResolvedValue({ userId: 1 });

  //   const req = { originalUrl: '/comments/5', params: { id: '5' }, user: { id: 2 } };
  //   const res = {};

  //   await authorize(req as unknown as Request, res as Response, next);

  //   expect(next).toHaveBeenCalledTimes(1);
  //   const err = next.mock.calls[0][0];
  //   expect(err).toBeInstanceOf(ForbiddenError);
  //   expect(err.statusCode).toBe(403);
  //   expect(err.message).toBe('권한이 없습니다');
  // });

  test('/babo/:id 알 수 없는 url이면 BadRequestError', async () => {
    const req = { originalUrl: '/babo/1' };
    const res = {};

    await authorize(req as unknown as Request, res as Response, next);

    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(BadRequestError);
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('잘못된 요청입니다');
  });

  test('repo가 에러를 던지면 next(err)로 전달', async () => {
    const dbErr = new Error('db down');
    (articleRepo.findById as jest.Mock).mockRejectedValue(dbErr);

    const req = { originalUrl: '/articles/1', params: { id: '1' }, user: { id: 1 } };
    const res = {};

    await authorize(req as unknown as Request, res as Response, next);

    const err = next.mock.calls[0][0];
    expect(err).toBe(dbErr);
  });
});
