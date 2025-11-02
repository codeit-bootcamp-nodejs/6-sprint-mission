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
  find: async (findOptions) => {
    return articleCommentRepository.findComments(findOptions);
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
  find: async (findOptions) => {
    return productCommentRepository.findComments(findOptions);
  },
};
