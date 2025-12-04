import express from 'express';
import prisma from '../lib/prisma.js';
import {
  authMiddleware,
  softAuthMiddleware,
} from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create Product
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const userId = req.user.id;

    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseInt(price),
        image,
        authorId: userId,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// List Products
router.get('/', softAuthMiddleware, async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword } = req.query;
    const skip = (page - 1) * pageSize;

    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword } },
            { description: { contains: keyword } },
          ],
        }
      : {};

    const products = await prisma.product.findMany({
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

    const productsWithLike = products.map((product) => {
      let isLiked = false;
      if (req.user) {
        // This is inefficient for many products.
        // Better to fetch liked IDs separately or use a subquery if possible.
        // For simplicity/Prisma limitations, we might need to fetch user's liked products IDs first.
        // Or include `likedBy` with `where` clause in the main query?
        // Prisma `include` with `where` on relation is possible.
      }
      return {
        ...product,
        likeCount: product._count.likedBy,
        isLiked, // We'll fix this below
      };
    });

    // Optimized approach for isLiked in list:
    // Fetch user's liked product IDs if logged in
    let likedProductIds = new Set();
    if (req.user) {
      const userLikes = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { likedProducts: { select: { id: true } } },
      });
      if (userLikes) {
        likedProductIds = new Set(userLikes.likedProducts.map((p) => p.id));
      }
    }

    const result = products.map((product) => ({
      ...product,
      likeCount: product._count.likedBy,
      isLiked: likedProductIds.has(product.id),
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get Product Detail
router.get('/:id', softAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        author: {
          select: { id: true, nickname: true, image: true },
        },
        _count: {
          select: { likedBy: true },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let isLiked = false;
    if (req.user) {
      const likeCheck = await prisma.product.findFirst({
        where: {
          id: productId,
          likedBy: {
            some: { id: req.user.id },
          },
        },
      });
      isLiked = !!likeCheck;
    }

    res.json({
      ...product,
      likeCount: product._count.likedBy,
      isLiked,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update Product
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image } = req.body;
    const userId = req.user.id;
    const productId = parseInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.authorId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description,
        price: price ? parseInt(price) : undefined,
        image,
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete Product
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const productId = parseInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.authorId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.product.delete({ where: { id: productId } });

    res.json({ message: 'Product deleted successfully' });
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
    const productId = parseInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if already liked
    const isLiked = await prisma.product.findFirst({
      where: {
        id: productId,
        likedBy: {
          some: { id: userId },
        },
      },
    });

    if (isLiked) {
      // Unlike
      await prisma.product.update({
        where: { id: productId },
        data: {
          likedBy: {
            disconnect: { id: userId },
          },
        },
      });
      res.json({ message: 'Unliked', isLiked: false });
    } else {
      // Like
      await prisma.product.update({
        where: { id: productId },
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
