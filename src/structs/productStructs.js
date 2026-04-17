// Prisma 클라이언트를 가져옵니다
import { prisma } from '../prisma.js';

// 상품 관련 기능을 담당하는 클래스입니다
class Product {
  // 상품 데이터를 저장하는 생성자입니다
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.tags = data.tags || [];
    this.image_url = data.image_url;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // 새로운 상품을 등록하는 함수입니다
  static async create(productData) {
    try {
      // Prisma를 사용해서 상품을 데이터베이스에 저장합니다
      const product = await prisma.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          tags: productData.tags || [],
          image_url: productData.image_url || null,
        },
      });

      // 저장된 상품을 Product 객체로 만들어서 반환합니다
      return new Product(product);
    } catch (error) {
      console.error('상품 등록 중 오류 발생:', error);
      throw error;
    }
  }

  // ID로 상품을 찾는 함수입니다
  static async findById(id) {
    try {
      // Prisma를 사용해서 상품을 찾습니다 (UUID이므로 parseInt 불필요)
      const product = await prisma.product.findUnique({
        where: { id: id },
      });

      // 상품이 없으면 null을 반환합니다
      if (!product) {
        return null;
      }

      // 찾은 상품을 Product 객체로 만들어서 반환합니다
      return new Product(product);
    } catch (error) {
      console.error('상품 조회 중 오류 발생:', error);
      throw error;
    }
  }

  // 상품 정보를 수정하는 함수입니다
  static async update(id, updateData) {
    try {
      // Prisma를 사용해서 상품을 수정합니다 (UUID이므로 parseInt 불필요)
      const product = await prisma.product.update({
        where: { id: id },
        data: {
          name: updateData.name,
          description: updateData.description,
          price: updateData.price,
          tags: updateData.tags,
          image_url: updateData.image_url,
        },
      });

      // 수정된 상품을 Product 객체로 만들어서 반환합니다
      return new Product(product);
    } catch (error) {
      console.error('상품 수정 중 오류 발생:', error);
      throw error;
    }
  }

  // 상품을 삭제하는 함수입니다
  static async delete(id) {
    try {
      // Prisma를 사용해서 상품을 삭제합니다 (UUID이므로 parseInt 불필요)
      const product = await prisma.product.delete({
        where: { id: id },
      });

      // 삭제된 상품을 Product 객체로 만들어서 반환합니다
      return new Product(product);
    } catch (error) {
      console.error('상품 삭제 중 오류 발생:', error);
      throw error;
    }
  }

  // 상품 목록을 조회하는 함수입니다 (페이지네이션, 정렬, 검색 기능 포함)
  static async findAll(options = {}) {
    const { offset = 0, limit = 10, sort = 'recent', search = '' } = options;

    try {
      // 검색 조건을 설정합니다
      const whereCondition = search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {};

      // 정렬 조건을 설정합니다
      let orderBy = {};
      if (sort === 'recent') {
        orderBy = { createdAt: 'desc' };
      } else if (sort === 'price_asc') {
        orderBy = { price: 'asc' };
      } else if (sort === 'price_desc') {
        orderBy = { price: 'desc' };
      }

      // Prisma를 사용해서 상품 목록을 조회합니다
      const products = await prisma.product.findMany({
        where: whereCondition,
        orderBy: orderBy,
        skip: parseInt(offset),
        take: parseInt(limit),
        select: {
          id: true,
          name: true,
          price: true,
          createdAt: true,
        },
      });

      // 조회된 상품들을 Product 객체로 만들어서 반환합니다
      return products.map((product) => new Product(product));
    } catch (error) {
      console.error('상품 목록 조회 중 오류 발생:', error);
      throw error;
    }
  }

  // 전체 상품 개수를 조회하는 함수입니다 (페이지네이션용)
  static async count(search = '') {
    try {
      // 검색 조건을 설정합니다
      const whereCondition = search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {};

      // Prisma를 사용해서 상품 개수를 조회합니다
      const count = await prisma.product.count({
        where: whereCondition,
      });

      return count;
    } catch (error) {
      console.error('상품 개수 조회 중 오류 발생:', error);
      throw error;
    }
  }
}

export default Product;
