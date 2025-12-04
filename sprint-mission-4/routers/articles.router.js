import express from 'express';
import prisma from '../lib/prisma.js';
import {
  authMiddleware,
  softAuthMiddleware,
} from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create Article
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        image,
        authorId: userId,
      },
    });

    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// List Articles
router.get('/', softAuthMiddleware, async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword } = req.query;
    const skip = (page - 1) * pageSize;

    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword } },
            { content: { contains: keyword } },
          ],
        }
      : {};

    const articles = await prisma.article.findMany({
      where,
      skip,
      take: parseInt(pageSize),
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, nickname: true },
        },
        _count: {
          select: { likedBy: true },
        },
      },
    });

    // Optimized approach for isLiked in list
    let likedArticleIds = new Set();
    if (req.user) {
      const userLikes = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { likedArticles: { select: { id: true } } },
      });
      if (userLikes) {
        likedArticleIds = new Set(userLikes.likedArticles.map((a) => a.id));
      }
    }

    const result = articles.map((article) => ({
      ...article,
      likeCount: article._count.likedBy,
      isLiked: likedArticleIds.has(article.id),
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get Article Detail
router.get('/:id', softAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const articleId = parseInt(id);

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: {
        author: {
          select: { id: true, nickname: true, image: true },
        },
        _count: {
          select: { likedBy: true },
        },
      },
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    let isLiked = false;
    if (req.user) {
      const likeCheck = await prisma.article.findFirst({
        where: {
          id: articleId,
          likedBy: {
            some: { id: req.user.id },
          },
        },
      });
      isLiked = !!likeCheck;
    }

    res.json({
      ...article,
      likeCount: article._count.likedBy,
      isLiked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update Article
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;
    const userId = req.user.id;
    const articleId = parseInt(id);

    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.authorId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        title,
        content,
        image,
      },
    });

    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete Article
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const articleId = parseInt(id);

    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.authorId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.article.delete({ where: { id: articleId } });

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Toggle Like
router.post('/:id/likes', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const articleId = parseInt(id);

    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if already liked
    const isLiked = await prisma.article.findFirst({
      where: {
        id: articleId,
        likedBy: {
          some: { id: userId },
        },
      },
    });

    if (isLiked) {
      // Unlike
      await prisma.article.update({
        where: { id: articleId },
        data: {
          likedBy: {
            disconnect: { id: userId },
          },
        },
      });
      res.json({ message: 'Unliked', isLiked: false });
    } else {
      // Like
      await prisma.article.update({
        where: { id: articleId },
        data: {
          likedBy: {
            connect: { id: userId },
          },
        },
      });
      res.json({ message: 'Liked', isLiked: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
