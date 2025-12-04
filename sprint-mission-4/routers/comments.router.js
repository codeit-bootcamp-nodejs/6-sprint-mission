import express from 'express';
import prisma from '../lib/prisma.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create Comment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content, productId, articleId } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    if (!productId && !articleId) {
      return res
        .status(400)
        .json({ message: 'ProductId or ArticleId is required' });
    }

    if (productId && articleId) {
      return res
        .status(400)
        .json({ message: 'Cannot comment on both Product and Article' });
    }

    // Check if target exists
    if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
    }

    if (articleId) {
      const article = await prisma.article.findUnique({
        where: { id: parseInt(articleId) },
      });
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        productId: productId ? parseInt(productId) : null,
        articleId: articleId ? parseInt(articleId) : null,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// List Comments
router.get('/', async (req, res) => {
  try {
    const { productId, articleId, page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;

    if (!productId && !articleId) {
      return res
        .status(400)
        .json({ message: 'ProductId or ArticleId is required' });
    }

    const where = {};
    if (productId) where.productId = parseInt(productId);
    if (articleId) where.articleId = parseInt(articleId);

    const comments = await prisma.comment.findMany({
      where,
      skip,
      take: parseInt(pageSize),
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, nickname: true, image: true },
        },
      },
    });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update Comment
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const commentId = parseInt(id);

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });

    res.json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete Comment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const commentId = parseInt(id);

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.comment.delete({ where: { id: commentId } });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
