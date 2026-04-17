import { prisma } from '../prisma.js';

const commentController = {
  // 상품 댓글 생성
  createProductComment: async (req, res) => {
    const { productId } = req.params;
    const { content } = req.body;

    // 상품 존재 확인
    await prisma.product.findUniqueOrThrow({
      where: { id: productId },
    });

    const comment = await prisma.productComment.create({
      data: {
        content,
        productId,
      },
    });

    res.status(201).send(comment);
  },

  // 게시글 댓글 생성
  createArticleComment: async (req, res) => {
    const { articleId } = req.params;
    const { content } = req.body;

    // 게시글 존재 확인
    await prisma.article.findUniqueOrThrow({
      where: { id: articleId },
    });

    const comment = await prisma.articleComment.create({
      data: {
        content,
        articleId,
      },
    });

    res.status(201).send(comment);
  },

  // 댓글 수정
  updateComment: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    // 댓글이 상품 댓글인지 게시글 댓글인지 확인
    let comment;
    try {
      comment = await prisma.productComment.update({
        where: { id },
        data: { content },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        // 상품 댓글이 아니면 게시글 댓글로 시도
        comment = await prisma.articleComment.update({
          where: { id },
          data: { content },
        });
      } else {
        throw error;
      }
    }
    res.send(comment);
  },

  // 댓글 삭제
  deleteComment: async (req, res) => {
    const { id } = req.params;

    // 댓글이 상품 댓글인지 게시글 댓글인지 확인
    let comment;
    try {
      comment = await prisma.productComment.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        // 상품 댓글이 아니면 게시글 댓글로 시도
        comment = await prisma.articleComment.delete({
          where: { id },
        });
      } else {
        throw error;
      }
    }
    res.send(comment);
  },

  // 상품 댓글 목록 조회 (cursor 방식 페이지네이션)
  getProductComments: async (req, res) => {
    const { productId } = req.params;
    const { cursor, limit = 10 } = req.query;
    const take = parseInt(limit);

    // 상품 존재 확인
    await prisma.product.findUniqueOrThrow({
      where: { id: productId },
    });

    const where = { productId };
    const comments = await prisma.productComment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      take,
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.send({
      data: comments,
      pagination: {
        hasMore: comments.length === take,
        nextCursor: comments.length > 0 ? comments[comments.length - 1].id : null,
      },
    });
  },

  // 게시글 댓글 목록 조회 (cursor 방식 페이지네이션)
  getArticleComments: async (req, res) => {
    const { articleId } = req.params;
    const { cursor, limit = 10 } = req.query;
    const take = parseInt(limit);

    // 게시글 존재 확인
    await prisma.article.findUniqueOrThrow({
      where: { id: articleId },
    });

    const where = { articleId };
    const comments = await prisma.articleComment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      take,
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.send({
      data: comments,
      pagination: {
        hasMore: comments.length === take,
        nextCursor: comments.length > 0 ? comments[comments.length - 1].id : null,
      },
    });
  },
};

export default commentController;
