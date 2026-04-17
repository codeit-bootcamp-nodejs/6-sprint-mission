import { prisma } from '../prisma.js';

const productController = {
  // 상품 생성
  createProduct: async (req, res) => {
    const product = await prisma.product.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: '상품이 성공적으로 등록되었습니다.',
      data: product,
    });
  },

  // 특정 상품 조회
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          tags: true,
          createdAt: true,
        },
      });

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: '상품을 찾을 수 없습니다.',
        });
      }
      throw error;
    }
  },

  // 상품 수정
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await prisma.product.update({
        where: { id },
        data: req.body,
      });

      res.json({
        success: true,
        message: '상품이 성공적으로 수정되었습니다.',
        data: product,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: '상품을 찾을 수 없습니다.',
        });
      }
      throw error;
    }
  },

  // 상품 삭제
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await prisma.product.delete({
        where: { id },
      });

      res.json({
        success: true,
        message: '상품이 성공적으로 삭제되었습니다.',
        data: product,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: '상품을 찾을 수 없습니다.',
        });
      }
      throw error;
    }
  },

  // 상품 목록 조회 (페이지네이션, 정렬, 검색)
  getProducts: async (req, res) => {
    const { offset = 0, limit = 10, sort = 'recent', search = '' } = req.query;

    const skip = parseInt(offset);
    const take = parseInt(limit);

    // 정렬 설정
    let orderBy = {};
    if (sort === 'recent') {
      orderBy = { createdAt: 'desc' };
    } else if (sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' };
    }

    // 검색 조건
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // 상품 목록과 전체 개수를 동시에 조회
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          name: true,
          price: true,
          createdAt: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.send({
      data: products,
      pagination: {
        total: totalCount,
        offset: skip,
        limit: take,
        hasMore: skip + take < totalCount,
      },
    });
  },
};

export default productController;
