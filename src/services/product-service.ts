// TODO) Product-Service: 비즈니스 로직 처리
import type { Prisma, Tag } from '@prisma/client';
import {
  NotFoundError,
  ValidationError,
  ForbiddenError,
  UnprocessableEntityError,
} from '../core/error/error-handler.js';
import { toIntOrThrow } from '../utils/to-int.js';
import {
  PRODUCT_ORDER,
  PRODUCT_ORDER_MAP,
  DEFAULT_PRODUCT_ORDER,
} from '../constants/product.js';

import { productRepo } from '../repositories/product-repository.js';
import { productLikeRepo } from '../repositories/product-like-repository.js';
import { notificationService } from './notification-service.js';

export const productService = {
  // 1) 상품 목록 조회
  async list(query: Record<string, unknown>) {
    // 1-1) 쿼리 파라미터 기본값 분리
    const { offset = 0, limit = 10, order = 'recent', q, tag } = query;

    // 1-2) offset 타입 number 변환
    const skip = toIntOrThrow(offset, 'offset');

    // 1-3) limit 타입 number 변환
    const take = toIntOrThrow(limit, 'limit');

    // 1-4) 정렬 키 타입 string 변환
    const orderKey = String(
      order || DEFAULT_PRODUCT_ORDER
    ).toLowerCase() as (typeof PRODUCT_ORDER)[keyof typeof PRODUCT_ORDER];

    // 1-5) 정렬 매핑 조회
    const orderBy = PRODUCT_ORDER_MAP[orderKey];

    // 1-6) 정렬 검증
    if (!orderBy) {
      throw new ValidationError(
        'order',
        `${Object.keys(PRODUCT_ORDER_MAP).join(', ')} 중 하나여야 합니다`
      );
    }

    // 1-7) 검색 조건(where) 구성
    const where: Prisma.ProductWhereInput = {};

    // 1-8) 검색 조건 있을 시 조건 반환, 없으면 전체 목록 반환
    if (q) {
      where.OR = [
        { name: { contains: String(q), mode: 'insensitive' as const } },
        { description: { contains: String(q), mode: 'insensitive' as const } },
      ];
    }

    // 1-9) 태그 필터 조건 추가
    if (tag) {
      where.tags = String(tag) as Tag;
    }

    return productRepo.findProducts(where, orderBy, skip, take);
  },

  // 2) 상품 조회
  async getOrThrow(id: number) {
    // 2-1) 상품 조회
    const product = await productRepo.findProductById(id);

    // 2-3) 상품 검증
    if (!product) {
      throw new NotFoundError('상품을 찾을 수 없습니다');
    }

    return product;
  },

  // 3) 상품 생성
  async create(data: Prisma.ProductUncheckedCreateInput, userId: number) {
    return await productRepo.createProduct({ ...data, userId });
  },

  // 4) 상품 수정
  async update(id: number, data: Prisma.ProductUpdateInput, userId: number) {
    // 4-1) 상품 조회
    const product = await productRepo.findProductById(id);

    // 4-3) 상품 검증
    if (!product) throw new NotFoundError('상품을 찾을 수 없습니다');

    // 4-4) 권한 검증
    if (product.userId !== userId) {
      throw new ForbiddenError('상품 수정 권한이 없습니다');
    }

    const nextPrice =
      typeof data.price === 'number'
        ? data.price
        : typeof data.price === 'object' && data.price && 'set' in data.price
        ? data.price.set
        : undefined;

    const priceChanged =
      typeof nextPrice === 'number' && nextPrice !== product.price;

    const updated = await productRepo.updateProduct(id, data);

    if (priceChanged) {
      const likedUsers = await productLikeRepo.listUserIdsByProduct(id);
      const targets = likedUsers.map((item) => item.userId);

      await Promise.all(
        targets.map((targetUserId) =>
          notificationService.create({
            userId: targetUserId,
            type: 'PRODUCT_PRICE_CHANGED',
            message: `"${product.name}"의 가격이 ${product.price}원에서 ${nextPrice}원으로 변경되었습니다`,
            productId: product.id,
          })
        )
      );
    }

    return updated;
  },

  // 5) 상품 삭제
  async remove(id: number, userId: number) {
    // 5-1) 상품 조회
    const product = await productRepo.findProductById(id);

    // 5-3) 상품 검증
    if (!product) throw new NotFoundError('상품을 찾을 수 없습니다');

    // 5-4) 권한 검증
    if (product.userId !== userId) {
      throw new ForbiddenError('상품 삭제 권한이 없습니다');
    }

    return productRepo.deleteProduct(id);
  },

  // 6) 상품 구매
  async purchase(productId: number, quantity: number) {
    // 6-1) 상품 조회
    const product = await productRepo.findProductById(productId);

    // 6-2) 상품 검증
    if (!product) {
      throw new NotFoundError('상품을 찾을 수 없습니다');
    }

    // 6-3) 재고 검증
    if (quantity > product.stock) {
      throw new UnprocessableEntityError('재고가 충분하지 않습니다');
    }

    return productRepo.purchaseProductTx(product.id, quantity, product.price);
  },

  // 7) 좋아요 여부 확인
  async isLiked(userId: number, productId: number) {
    const like = await productLikeRepo.findProductLike(userId, productId);

    return Boolean(like);
  },

  // 8) 유저별 상품 목록 조회
  async listByUser(userId: number) {
    return await productRepo.findProductsByUser(userId);
  },
};
