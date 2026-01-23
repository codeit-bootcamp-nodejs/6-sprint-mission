import { prisma } from '../prisma.js';

const articleController = {
  // 게시글 생성
  createArticle: async (req, res) => {
    const article = await prisma.article.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: '게시글이 성공적으로 등록되었습니다.',
      data: article,
    });
  },

  // 특정 게시글 조회
  getArticleById: async (req, res) => {
    try {
      const { id } = req.params;

      const article = await prisma.article.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      });

      res.json({
        success: true,
        data: article,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: '게시글을 찾을 수 없습니다.',
        });
      }
      throw error;
    }
  },

  // 게시글 수정
  updateArticle: async (req, res) => {
    try {
      const { id } = req.params;

      const article = await prisma.article.update({
        where: { id },
        data: req.body,
      });

      res.json({
        success: true,
        message: '게시글이 성공적으로 수정되었습니다.',
        data: article,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: '게시글을 찾을 수 없습니다.',
        });
      }
      throw error;
    }
  },

  // 게시글 삭제
  deleteArticle: async (req, res) => {
    try {
      const { id } = req.params;

      const article = await prisma.article.delete({
        where: { id },
      });

      res.json({
        success: true,
        message: '게시글이 성공적으로 삭제되었습니다.',
        data: article,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: '게시글을 찾을 수 없습니다.',
        });
      }
      throw error;
    }
  },

  // 게시글 목록 조회 (페이지네이션, 정렬, 검색)
  getArticles: async (req, res) => {
    const { offset = 0, limit = 10, sort = 'recent', search = '' } = req.query;

    const skip = parseInt(offset);
    const take = parseInt(limit);

    // 정렬 설정
    let orderBy = {};
    if (sort === 'recent') {
      orderBy = { createdAt: 'desc' };
    } else if (sort === 'title_asc') {
      orderBy = { title: 'asc' };
    } else if (sort === 'title_desc') {
      orderBy = { title: 'desc' };
    }

    // 검색 조건
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // 게시글 목록과 전체 개수를 동시에 조회
    const [articles, totalCount] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      }),
      prisma.article.count({ where }),
    ]);

    res.send({
      data: articles,
      pagination: {
        total: totalCount,
        offset: skip,
        limit: take,
        hasMore: skip + take < totalCount,
      },
    });
  },
};

export default articleController;
