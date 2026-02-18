import { ProductService } from '../src/service/productService';
import { ProductRepository } from '../src/repository/productRepository';
import { GetProductsQueryType } from '../src/structs/productStruct';
import { CreateProductType } from '../src/structs/productStruct';
import { PatchProductType } from '../src/structs/productStruct';
import { NotificationService } from '../src/service/notificationService';

// NotificationService Mock
jest.mock('../src/service/notificationService');

// ProductRepository를 Mock 하기 위한 타입 정의
type MockProductRepository = jest.Mocked<ProductRepository>;

const user = {
  id: 1,
  email: 'test@test.com',
  name: 'test',
  nickname: 'test',
  password: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProductService 유닛 테스트', () => {
  let productService: ProductService;
  let productRepository: MockProductRepository;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(() => {
    productRepository = {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findFirstTag: jest.fn(),
      createTag: jest.fn(),
      findLikes: jest.fn(),
    } as unknown as MockProductRepository;

    // NotificationService의 인스턴스를 모킹
    notificationService = new NotificationService({} as any) as jest.Mocked<NotificationService>;
    notificationService.notifyPriceChange = jest.fn();

    productService = new ProductService(productRepository, notificationService);
  });

  describe('getProduct 로직 테스트', () => {
    test('쿼리 파라미터가 없을 때 기본값(page=1, limit=10, recent)으로 레포지토리를 호출해야 한다', async () => {
      const query: GetProductsQueryType = {};
      const mockResult = [
        {
          id: 1,
          productName: 'Test',
          price: 1000,
          stock: 10,
          description: 'test',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // findMany가 mockResult를 반환하도록 설정
      productRepository.findMany.mockResolvedValue(mockResult);

      const response = await productService.getProduct(query);
      expect(response).toEqual(mockResult); // 반환값 검증

      // findMany가 올바른 옵션으로 호출되었는지 검증 (비즈니스 로직 핵심)
      expect(productRepository.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 10,
        select: {
          id: true,
          productName: true,
          price: true,
          createdAt: true,
        },
      });
    });

    test('검색(search), 정렬(oldest), 페이징(page, limit) 파라미터가 적용된 쿼리를 생성해야 한다', async () => {
      const query: GetProductsQueryType = {
        page: 3,
        limit: 20,
        search: '검색어',
        order: 'oldest',
      };

      productRepository.findMany.mockResolvedValue([]);

      const response = await productService.getProduct(query);
      expect(response).toEqual([]);
      // 어떤 인자를 전달 받아 호출 됐는지 검증
      expect(productRepository.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ productName: { contains: '검색어' } }, { description: { contains: '검색어' } }],
        },
        orderBy: { createdAt: 'asc' },
        skip: 40,
        take: 20,
        select: {
          id: true,
          productName: true,
          price: true,
          createdAt: true,
        },
      });
    });
  });

  describe('createProduct 로직 테스트', () => {
    test('새로운 태그와 함께 상품 생성 시> 태그를 먼저 생성하고 상품과 연결', async () => {
      const createProductData: CreateProductType = {
        productName: 'New Product',
        description: 'Description',
        price: 1000,
        tag: 'newTag',
        stock: 10,
      };

      // 1. 태그가 이미 존재하는지 확인 -> 없음(null) 반환하도록 설정
      productRepository.findFirstTag.mockResolvedValue(null);

      // 2. 태그가 없으므로 생성 -> 생성된 태그(ID: 10) 반환하도록 설정
      productRepository.createTag.mockResolvedValue({
        id: 10,
        tag: 'newTag',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // 3. 상품 생성 성공 결과 설정
      productRepository.create.mockResolvedValue({
        id: 1,
        ...createProductData,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        productTags: [{ tag: { tag: 'newTag' } }], // select 결과 시늉
        productImages: [],
      } as any);

      const response = await productService.createProduct(createProductData, user);

      // 중요: 서비스가 "태그 생성"을 시도했는지 확인
      expect(productRepository.createTag).toHaveBeenCalledWith({
        data: { tag: 'newTag' },
      });
      //  expect.objectContaining({}) : 객체안에 특정 속성이 있는지 확인 없어도 가능 하지만 완벽히 일치 해야함
      expect(productRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          productName: 'New Product',
          description: 'Description',
          price: 1000,
          stock: 10,
          productTags: {
            create: {
              tag: { connect: { id: 10 } },
            },
          },
          user: { connect: { id: user.id } },
        }),
      );
      expect(response.productName).toBe('New Product');
      expect(response).toMatchObject({ productTags: [{ tag: { tag: 'newTag' } }] });
    });
  });

  test('기존 태그와 함께 상품 생성 시> 태그를 생성하지 않고 상품과 연결', async () => {
    const createProductData: CreateProductType = {
      productName: 'New Product',
      description: 'Description',
      price: 1000,
      tag: 'existingTag',
      stock: 10,
    };

    productRepository.findFirstTag.mockResolvedValue({
      id: 9,
      tag: 'existingTag',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 3. 상품 생성 성공 결과 설정
    productRepository.create.mockResolvedValue({
      id: 1,
      ...createProductData,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      productTags: [{ tag: { tag: 'existingTag' } }], // select 결과 시늉
      productImages: [],
    } as any);

    const response = await productService.createProduct(createProductData, user);

    // 기존에 있는 태그인가 검증
    expect(productRepository.findFirstTag).toHaveBeenCalledWith({
      where: { tag: 'existingTag' },
    });
    //  expect.objectContaining({}) : 객체안에 특정 속성이 있는지 확인 없어도 가능 하지만 완벽히 일치 해야함
    expect(productRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        productName: 'New Product',
        description: 'Description',
        price: 1000,
        stock: 10,
        productTags: {
          create: {
            tag: { connect: { id: 9 } },
          },
        },
        user: { connect: { id: user.id } },
      }),
    );
    expect(response.productName).toBe('New Product');
    // 기존에 있는 태그와 연결되었는지 검증
    expect(response).toMatchObject({ productTags: [{ tag: { tag: 'existingTag' } }] });
  });

  describe('patchProduct 로직 테스트', () => {
    test('상품 부분 수정 요청 테스트', async () => {
      const updateProductData: PatchProductType = {
        price: 2000,
        tag: 'existingTag',
        stock: 20,
      };
      productRepository.findUniqueOrThrow.mockResolvedValue({
        id: 1,
        productName: 'New Product',
        description: 'Description',
        price: 1000,
        stock: 10,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      productRepository.findFirstTag.mockResolvedValue({
        id: 9,
        tag: 'existingTag',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // 3. 상품 수정 성공 결과 설정
      productRepository.update.mockResolvedValue({
        id: 1,
        productName: 'New Product',
        description: 'Description',
        price: 2000,
        stock: 20,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        productTags: [{ tag: { tag: 'existingTag' } }], // select 결과 시늉
        productImages: [],
      } as any);

      // 4. 좋아요 누른 유저 목록 설정 (가격 변동 알림 대상)
      productRepository.findLikes.mockResolvedValue([
        { userId: 2 } as any, // 알림 받을 유저
      ]);

      const response = await productService.patchProduct(user.id, updateProductData, user);

      // NotificationService가 호출되었는지 검증 (관심사 분리)
      expect(notificationService.notifyPriceChange).toHaveBeenCalledWith([2], {
        id: 1,
        productName: 'New Product',
      });

      expect(productRepository.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: user.id },
        select: { userId: true, price: true },
      });

      // 기존에 있는 태그인가 검증
      expect(productRepository.findFirstTag).toHaveBeenCalledWith({
        where: { tag: 'existingTag' },
      });
      //  expect.objectContaining({}) : 객체안에 특정 속성이 있는지 확인 없어도 가능 하지만 완벽히 일치 해야함
      expect(productRepository.update).toHaveBeenCalledWith(
        user.id,
        expect.objectContaining({
          price: 2000,
          stock: 20,
          productTags: {
            deleteMany: {},
            create: {
              tag: { connect: { id: 9 } },
            },
          },
        }),
      );
      expect(response.productName).toBe('New Product');
      // 기존에 있는 태그와 연결되었는지 검증
      expect(response).toMatchObject({ productTags: [{ tag: { tag: 'existingTag' } }] });
    });
  });

  describe('deleteProduct 로직 테스트', () => {
    test('상품 삭제 성공 테스트', async () => {
      const productId = 1;

      productRepository.findUniqueOrThrow.mockResolvedValue({
        id: productId,
        userId: user.id,
        productName: 'Test Product',
        price: 1000,
        stock: 10,
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await productService.deleteProduct(productId, user);

      expect(productRepository.findUniqueOrThrow).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: productId },
        }),
      );

      expect(productRepository.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: productId },
        }),
      );

      expect(response).toBeUndefined();
    });

    test('상품이 존재하지 않을 때 404 에러 테스트', async () => {
      const productId = 999;

      // 상품이 존재하지 않음
      productRepository.findUniqueOrThrow.mockRejectedValue(new Error('상품을 찾을 수 없습니다.'));

      await expect(productService.deleteProduct(productId, user)).rejects.toThrow(
        '상품을 찾을 수 없습니다.',
      );
      expect(productRepository.findUniqueOrThrow).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: productId },
        }),
      );

      expect(productRepository.delete).not.toHaveBeenCalled();
    });

    test('상품 소유자가 아닐 때 403 에러 테스트', async () => {
      const productId = 1;
      const otherUser = {
        id: 2,
        email: 'test@test.com',
        name: 'test',
        nickname: 'test',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 상품은 존재하지만 소유자가 다름
      productRepository.findUniqueOrThrow.mockResolvedValue({
        id: productId,
        userId: 1, // 소유자는 1번 유저
        productName: 'Test Product',
        price: 1000,
        stock: 10,
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(productService.deleteProduct(productId, otherUser)).rejects.toThrow(
        '상품을 삭제할 권한이 없습니다.',
      );
      expect(productRepository.findUniqueOrThrow).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: productId },
        }),
      );

      expect(productRepository.delete).not.toHaveBeenCalled();
    });
  });
});
