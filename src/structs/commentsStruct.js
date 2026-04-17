// Prisma 클라이언트를 가져옵니다
import { prisma } from '../prisma.js';

// 상품 댓글 관련 기능을 담당하는 클래스입니다
class ProductComment {
  // 상품 댓글 데이터를 저장하는 생성자입니다
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.productId = data.productId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // 상품에 댓글을 등록하는 함수입니다
  static async create(productId, commentData) {
    try {
      // Prisma를 사용해서 상품 댓글을 데이터베이스에 저장합니다
      const comment = await prisma.productComment.create({
        data: {
          content: commentData.content,
          productId: productId,
        },
      });

      // 저장된 댓글을 ProductComment 객체로 만들어서 반환합니다
      return new ProductComment(comment);
    } catch (error) {
      console.error('상품 댓글 등록 중 오류 발생:', error);
      throw error;
    }
  }

  // ID로 상품 댓글을 찾는 함수입니다
  static async findById(id) {
    try {
      // Prisma를 사용해서 상품 댓글을 찾습니다 (UUID이므로 parseInt 불필요)
      const comment = await prisma.productComment.findUnique({
        where: { id: id },
      });

      // 댓글이 없으면 null을 반환합니다
      if (!comment) {
        return null;
      }

      // 찾은 댓글을 ProductComment 객체로 만들어서 반환합니다
      return new ProductComment(comment);
    } catch (error) {
      console.error('상품 댓글 조회 중 오류 발생:', error);
      throw error;
    }
  }

  // 상품 댓글 정보를 수정하는 함수입니다
  static async update(id, updateData) {
    try {
      // Prisma를 사용해서 상품 댓글을 수정합니다 (UUID이므로 parseInt 불필요)
      const comment = await prisma.productComment.update({
        where: { id: id },
        data: {
          content: updateData.content,
        },
      });

      // 수정된 댓글을 ProductComment 객체로 만들어서 반환합니다
      return new ProductComment(comment);
    } catch (error) {
      console.error('상품 댓글 수정 중 오류 발생:', error);
      throw error;
    }
  }

  // 상품 댓글을 삭제하는 함수입니다
  static async delete(id) {
    try {
      // Prisma를 사용해서 상품 댓글을 삭제합니다 (UUID이므로 parseInt 불필요)
      const comment = await prisma.productComment.delete({
        where: { id: id },
      });

      // 삭제된 댓글을 ProductComment 객체로 만들어서 반환합니다
      return new ProductComment(comment);
    } catch (error) {
      console.error('상품 댓글 삭제 중 오류 발생:', error);
      throw error;
    }
  }

  // 상품 댓글 목록을 조회하는 함수입니다 (cursor 방식 페이지네이션)
  static async findByProductId(productId, options = {}) {
    const { cursor = null, limit = 10 } = options;

    try {
      // cursor 페이지네이션을 위한 조건을 설정합니다
      const whereCondition = {
        productId: productId,
      };

      // cursor가 있으면 해당 ID보다 작은 댓글만 조회합니다
      if (cursor) {
        whereCondition.id = { lt: cursor };
      }

      // Prisma를 사용해서 상품 댓글 목록을 조회합니다
      const comments = await prisma.productComment.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      });

      // 조회된 댓글들을 ProductComment 객체로 만들어서 반환합니다
      return comments.map((comment) => new ProductComment(comment));
    } catch (error) {
      console.error('상품 댓글 목록 조회 중 오류 발생:', error);
      throw error;
    }
  }

  // 상품 댓글 개수를 조회하는 함수입니다
  static async countByProductId(productId) {
    try {
      // Prisma를 사용해서 상품 댓글 개수를 조회합니다
      const count = await prisma.productComment.count({
        where: { productId: productId },
      });

      return count;
    } catch (error) {
      console.error('상품 댓글 개수 조회 중 오류 발생:', error);
      throw error;
    }
  }
}

// 게시글 댓글 관련 기능을 담당하는 클래스입니다
class ArticleComment {
  // 게시글 댓글 데이터를 저장하는 생성자입니다
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.articleId = data.articleId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // 게시글에 댓글을 등록하는 함수입니다
  static async create(articleId, commentData) {
    try {
      // Prisma를 사용해서 게시글 댓글을 데이터베이스에 저장합니다
      const comment = await prisma.articleComment.create({
        data: {
          content: commentData.content,
          articleId: articleId,
        },
      });

      // 저장된 댓글을 ArticleComment 객체로 만들어서 반환합니다
      return new ArticleComment(comment);
    } catch (error) {
      console.error('게시글 댓글 등록 중 오류 발생:', error);
      throw error;
    }
  }

  // ID로 게시글 댓글을 찾는 함수입니다
  static async findById(id) {
    try {
      // Prisma를 사용해서 게시글 댓글을 찾습니다 (UUID이므로 parseInt 불필요)
      const comment = await prisma.articleComment.findUnique({
        where: { id: id },
      });

      // 댓글이 없으면 null을 반환합니다
      if (!comment) {
        return null;
      }

      // 찾은 댓글을 ArticleComment 객체로 만들어서 반환합니다
      return new ArticleComment(comment);
    } catch (error) {
      console.error('게시글 댓글 조회 중 오류 발생:', error);
      throw error;
    }
  }

  // 게시글 댓글 정보를 수정하는 함수입니다
  static async update(id, updateData) {
    try {
      // Prisma를 사용해서 게시글 댓글을 수정합니다 (UUID이므로 parseInt 불필요)
      const comment = await prisma.articleComment.update({
        where: { id: id },
        data: {
          content: updateData.content,
        },
      });

      // 수정된 댓글을 ArticleComment 객체로 만들어서 반환합니다
      return new ArticleComment(comment);
    } catch (error) {
      console.error('게시글 댓글 수정 중 오류 발생:', error);
      throw error;
    }
  }

  // 게시글 댓글을 삭제하는 함수입니다
  static async delete(id) {
    try {
      // Prisma를 사용해서 게시글 댓글을 삭제합니다 (UUID이므로 parseInt 불필요)
      const comment = await prisma.articleComment.delete({
        where: { id: id },
      });

      // 삭제된 댓글을 ArticleComment 객체로 만들어서 반환합니다
      return new ArticleComment(comment);
    } catch (error) {
      console.error('게시글 댓글 삭제 중 오류 발생:', error);
      throw error;
    }
  }

  // 게시글 댓글 목록을 조회하는 함수입니다 (cursor 방식 페이지네이션)
  static async findByArticleId(articleId, options = {}) {
    const { cursor = null, limit = 10 } = options;

    try {
      // cursor 페이지네이션을 위한 조건을 설정합니다
      const whereCondition = {
        articleId: articleId,
      };

      // cursor가 있으면 해당 ID보다 작은 댓글만 조회합니다
      if (cursor) {
        whereCondition.id = { lt: cursor };
      }

      // Prisma를 사용해서 게시글 댓글 목록을 조회합니다
      const comments = await prisma.articleComment.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      });

      // 조회된 댓글들을 ArticleComment 객체로 만들어서 반환합니다
      return comments.map((comment) => new ArticleComment(comment));
    } catch (error) {
      console.error('게시글 댓글 목록 조회 중 오류 발생:', error);
      throw error;
    }
  }

  // 게시글 댓글 개수를 조회하는 함수입니다
  static async countByArticleId(articleId) {
    try {
      // Prisma를 사용해서 게시글 댓글 개수를 조회합니다
      const count = await prisma.articleComment.count({
        where: { articleId: articleId },
      });

      return count;
    } catch (error) {
      console.error('게시글 댓글 개수 조회 중 오류 발생:', error);
      throw error;
    }
  }
}

// 기존 호환성을 위해 Comment 클래스를 유지합니다 (ProductComment로 리다이렉트)
class Comment {
  static async createForProduct(productId, commentData) {
    return ProductComment.create(productId, commentData);
  }

  static async createForArticle(articleId, commentData) {
    return ArticleComment.create(articleId, commentData);
  }

  static async findById(id) {
    // 먼저 상품 댓글에서 찾아보고, 없으면 게시글 댓글에서 찾습니다
    let comment = await ProductComment.findById(id);
    if (comment) {
      return comment;
    }
    return ArticleComment.findById(id);
  }

  static async update(id, updateData) {
    // 먼저 상품 댓글에서 찾아보고, 없으면 게시글 댓글에서 수정합니다
    let comment = await ProductComment.findById(id);
    if (comment) {
      return ProductComment.update(id, updateData);
    }
    return ArticleComment.update(id, updateData);
  }

  static async delete(id) {
    // 먼저 상품 댓글에서 찾아보고, 없으면 게시글 댓글에서 삭제합니다
    let comment = await ProductComment.findById(id);
    if (comment) {
      return ProductComment.delete(id);
    }
    return ArticleComment.delete(id);
  }

  static async findByProductId(productId, options = {}) {
    return ProductComment.findByProductId(productId, options);
  }

  static async findByArticleId(articleId, options = {}) {
    return ArticleComment.findByArticleId(articleId, options);
  }

  static async countByProductId(productId) {
    return ProductComment.countByProductId(productId);
  }

  static async countByArticleId(articleId) {
    return ArticleComment.countByArticleId(articleId);
  }
}

export default Comment;
export { ProductComment, ArticleComment };
