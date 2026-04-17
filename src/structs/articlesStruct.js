// Prisma 클라이언트를 가져옵니다
import { prisma } from '../prisma.js';

// 게시글 관련 기능을 담당하는 클래스입니다
class Article {
  // 게시글 데이터를 저장하는 생성자입니다
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // 새로운 게시글을 등록하는 함수입니다
  static async create(articleData) {
    try {
      // Prisma를 사용해서 게시글을 데이터베이스에 저장합니다
      const article = await prisma.article.create({
        data: {
          title: articleData.title,
          content: articleData.content,
        },
      });

      // 저장된 게시글을 Article 객체로 만들어서 반환합니다
      return new Article(article);
    } catch (error) {
      console.error('게시글 등록 중 오류 발생:', error);
      throw error;
    }
  }

  // ID로 게시글을 찾는 함수입니다
  static async findById(id) {
    try {
      // Prisma를 사용해서 게시글을 찾습니다 (UUID이므로 parseInt 불필요)
      const article = await prisma.article.findUnique({
        where: { id: id },
      });

      // 게시글이 없으면 null을 반환합니다
      if (!article) {
        return null;
      }

      // 찾은 게시글을 Article 객체로 만들어서 반환합니다
      return new Article(article);
    } catch (error) {
      console.error('게시글 조회 중 오류 발생:', error);
      throw error;
    }
  }

  // 게시글 정보를 수정하는 함수입니다
  static async update(id, updateData) {
    try {
      // Prisma를 사용해서 게시글을 수정합니다 (UUID이므로 parseInt 불필요)
      const article = await prisma.article.update({
        where: { id: id },
        data: {
          title: updateData.title,
          content: updateData.content,
        },
      });

      // 수정된 게시글을 Article 객체로 만들어서 반환합니다
      return new Article(article);
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      throw error;
    }
  }

  // 게시글을 삭제하는 함수입니다
  static async delete(id) {
    try {
      // Prisma를 사용해서 게시글을 삭제합니다 (UUID이므로 parseInt 불필요)
      const article = await prisma.article.delete({
        where: { id: id },
      });

      // 삭제된 게시글을 Article 객체로 만들어서 반환합니다
      return new Article(article);
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      throw error;
    }
  }

  // 게시글 목록을 조회하는 함수입니다 (페이지네이션, 정렬, 검색 기능 포함)
  static async findAll(options = {}) {
    const { offset = 0, limit = 10, sort = 'recent', search = '' } = options;

    try {
      // 검색 조건을 설정합니다
      const whereCondition = search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {};

      // 정렬 조건을 설정합니다
      let orderBy = {};
      if (sort === 'recent') {
        orderBy = { createdAt: 'desc' };
      } else if (sort === 'title_asc') {
        orderBy = { title: 'asc' };
      } else if (sort === 'title_desc') {
        orderBy = { title: 'desc' };
      }

      // Prisma를 사용해서 게시글 목록을 조회합니다
      const articles = await prisma.article.findMany({
        where: whereCondition,
        orderBy: orderBy,
        skip: parseInt(offset),
        take: parseInt(limit),
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      });

      // 조회된 게시글들을 Article 객체로 만들어서 반환합니다
      return articles.map((article) => new Article(article));
    } catch (error) {
      console.error('게시글 목록 조회 중 오류 발생:', error);
      throw error;
    }
  }

  // 전체 게시글 개수를 조회하는 함수입니다 (페이지네이션용)
  static async count(search = '') {
    try {
      // 검색 조건을 설정합니다
      const whereCondition = search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {};

      // Prisma를 사용해서 게시글 개수를 조회합니다
      const count = await prisma.article.count({
        where: whereCondition,
      });

      return count;
    } catch (error) {
      console.error('게시글 개수 조회 중 오류 발생:', error);
      throw error;
    }
  }
}

export default Article;
