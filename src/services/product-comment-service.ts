// TODO) Product-Comment-Service: 비즈니스 로직 처리
import { NotFoundError, ForbiddenError } from '../core/error/error-handler.js';
import { assertContent } from '../utils/to-content.js';

import { productCommentRepo } from '../repositories/product-comment-repository.js';
import { productRepo } from '../repositories/product-repository.js';

export const productCommentService = {
  // 1) 댓글 목록 조회
  async list(productId: number) {
    // 1-1) 댓글 대상 상품 조회
    const product = await productRepo.findProductById(productId);

    // 1-2) 상품 검증
    if (!product) {
      throw new NotFoundError('상품을 찾을 수 없습니다');
    }

    return productCommentRepo.findCommentsByProduct(productId);
  },

  // 2) 댓글 생성
  async create(
    { productId, content }: { productId: number; content: string },
    userId: number
  ) {
    // 2-1) 타입 string 변환
    const body = assertContent(content);

    // 2-2) 댓글 대상 상품 조회
    const product = await productRepo.findProductById(productId);

    // 2-3) 상품 검증
    if (!product) {
      throw new NotFoundError('상품을 찾을 수 없습니다');
    }

    return productCommentRepo.createProductComment({
      productId,
      content: body,
      userId,
    });
  },

  // 3) 댓글 수정
  async update(id: number, content: string, userId: number) {
    // 3-1) 타입 string 변환
    const body = assertContent(content);

    // 3-2) 기존 댓글 조회
    const exists = await productCommentRepo.findProductCommentById(id);

    // 3-3) 댓글 검증
    if (!exists) {
      throw new NotFoundError('댓글을 찾을 수 없습니다');
    }

    // 3-4) 권한 검증
    if (exists.userId !== userId) {
      throw new ForbiddenError('댓글 수정 권한이 없습니다.');
    }

    return productCommentRepo.updateProductComment(id, {
      content: body,
    });
  },

  // 4) 댓글 삭제
  async remove(id: number, userId: number) {
    // 4-1) 기존 댓글 조회
    const exists = await productCommentRepo.findProductCommentById(id);

    // 4-2) 댓글 검증
    if (!exists) {
      throw new NotFoundError('댓글을 찾을 수 없습니다');
    }

    // 4-3) 권한 검증
    if (exists.userId !== userId) {
      throw new ForbiddenError('댓글 삭제 권한이 없습니다.');
    }

    return productCommentRepo.deleteProductComment(id);
  },
};
