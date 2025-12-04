import express from 'express';
import prisma from '../lib/prisma.js';
import {
  authMiddleware,
  softAuthMiddleware,
} from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create Post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: '제목과 내용은 필수입니다.' });
    }

    // Prisma 스키마에 'Post' 모델이 있다고 가정합니다.
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        authorId: userId,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// List Posts
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

    const posts = await prisma.post.findMany({
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

    let likedPostIds = new Set();
    if (req.user) {
      const userLikes = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { likedPosts: { select: { id: true } } }, // 'likedPosts' 관계가 필요합니다.
      });
      if (userLikes) {
        likedPostIds = new Set(userLikes.likedPosts.map((p) => p.id));
      }
    }

    const result = posts.map((post) => ({
      ...post,
      likeCount: post._count.likedBy,
      isLiked: likedPostIds.has(post.id),
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get Post Detail
router.get('/:id', softAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const postId = parseInt(id);

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: { id: true, nickname: true, image: true },
        },
        _count: {
          select: { likedBy: true },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    let isLiked = false;
    if (req.user) {
      const likeCheck = await prisma.post.findFirst({
        where: {
          id: postId,
          likedBy: {
            some: { id: req.user.id },
          },
        },
      });
      isLiked = !!likeCheck;
    }

    res.json({
      ...post,
      likeCount: post._count.likedBy,
      isLiked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update Post
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;
    const userId = req.user.id;
    const postId = parseInt(id);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({ message: '수정 권한이 없습니다.' });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        image,
      },
    });

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete Post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const postId = parseInt(id);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    if (post.authorId !== userId) {
      return res.status(403).json({ message: '삭제 권한이 없습니다.' });
    }

    await prisma.post.delete({ where: { id: postId } });

    res.json({ message: '게시물이 삭제되었습니다.' });
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
    const postId = parseInt(id);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
    }

    const isLiked = await prisma.post.findFirst({
      where: {
        id: postId,
        likedBy: {
          some: { id: userId },
        },
      },
    });

    if (isLiked) {
      // Unlike
      await prisma.post.update({
        where: { id: postId },
        data: {
          likedBy: { disconnect: { id: userId } },
        },
      });
      res.json({ message: '좋아요를 취소했습니다.', isLiked: false });
    } else {
      // Like
      await prisma.post.update({
        where: { id: postId },
        data: {
          likedBy: { connect: { id: userId } },
        },
      });
      res.json({ message: '좋아요를 눌렀습니다.', isLiked: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
