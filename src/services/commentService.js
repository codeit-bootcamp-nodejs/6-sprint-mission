import prisma from '../lib/prisma.js';
import { CommentRepository } from '../repositories/commentRepository.js';

const articleCommentRepository = new CommentRepository(prisma.articleComment);
const productCommentRepository = new CommentRepository(prisma.productComment);

export const articleCommentService = {
  create: async (data) => {
    return articleCommentRepository.createComment(data);
  },
  update: async (id, data) => {
    return articleCommentRepository.patchComment(id, data);
  },
  delete: async (id) => {
    return articleCommentRepository.deleteComment(id);
  },
  findById: async (id) => {
    return articleCommentRepository.findCommentById(id);
  },
  find: async ({ cursor, sort = 'newest', keyword = '', limit = 10 }) => {
    const sortOptions = {
      newest: { createdAt: 'desc' },
      oldest: { createdAt: 'asc' },
    };

    const findOptions = {
      take: limit,
      orderBy: sortOptions[sort] || sortOptions.newest,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      ...(keyword && { where: { content: { contains: keyword } } }),
    };

    const comments = await articleCommentRepository.findComments(findOptions);
    const nextCursor =
      comments.length === limit ? comments[limit - 1].id : null;
    return { comments, nextCursor };
  },
};

export const productCommentService = {
  create: async (data) => {
    return productCommentRepository.createComment(data);
  },
  update: async (id, data) => {
    return productCommentRepository.patchComment(id, data);
  },
  delete: async (id) => {
    return productCommentRepository.deleteComment(id);
  },
  findById: async (id) => {
    return productCommentRepository.findCommentById(id);
  },
  find: async ({ cursor, sort = 'newest', keyword = '', limit = 10 }) => {
    // const  = req.query;
    // const limit = parseInt(req.query.limit || 10, 10);

    const sortOptions = {
      newest: { createdAt: 'desc' },
      oldest: { createdAt: 'asc' },
    };

    const findOptions = {
      take: limit,
      orderBy: sortOptions[sort] || sortOptions.newest,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      ...(keyword && { where: { content: { contains: keyword } } }),
    };

    const comments = await productCommentRepository.findComments(findOptions);
    const nextCursor =
      comments.length === limit ? comments[limit - 1].id : null;
    return { comments, nextCursor };
  },
};
