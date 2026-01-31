import productService from '../src/service/product.service';
import productRepo from '../src/repository/product.repo';
import { LikedProduct2show } from '../src/types/interfaceType';

/*  productId로 prisma.product.findById(productId)로 product 가져옴 
    product.likedUsers에 userId가 포함되어 있는지 비교

    포함이면 --> productRepo.cancelLike 호출하고 isLiked: false 필드가진 객체 반환
    미포함이면 --> productRepo.like 호출하고 isLiked: true 필드가진 객체 반환
*/

let findByIdSpy: jest.SpyInstance;
let likeSpy: jest.SpyInstance;
let cancelLikeSpy: jest.SpyInstance;

const userId = 1;
const productId = 2;
const product = {
  id: productId,
  name: 'Product',
  description: 'Product in Test',
  price: 10,
  userId: 2,
  likedUsers: [{ id: 7, nickname: 'user7' }]
};
const updatedProduct = {
  ...product,
  likedUsers: [...product.likedUsers, { id: userId, nickname: `user1` }]
};

beforeEach(() => {
  findByIdSpy = jest.spyOn(productRepo, 'findById');
  likeSpy = jest.spyOn(productRepo, 'like');
  cancelLikeSpy = jest.spyOn(productRepo, 'cancelLike');
});
afterAll(() => {
  jest.restoreAllMocks();
});

test('좋아요를 누르지 않았던 상품인 경우', async () => {
  findByIdSpy.mockResolvedValue(product as any);
  likeSpy.mockResolvedValue(updatedProduct as any);
  const response: LikedProduct2show = await productService.likeToggle(userId, productId);

  expect(findByIdSpy).toHaveBeenCalledTimes(1);
  expect(likeSpy).toHaveBeenCalledTimes(1);
  expect(cancelLikeSpy).not.toHaveBeenCalled();

  expect(response.isLiked).toBeTruthy();
  expect(response.id).toEqual(2);
  expect(response.likedUsers!.length).toEqual(2);
  expect(response.likedUsers!).toEqual(['user7', 'user1']);
});

test('좋아요를 눌렀던 상품인 경우', async () => {
  findByIdSpy.mockResolvedValue(updatedProduct as any);
  cancelLikeSpy.mockResolvedValue(product as any);
  const response: LikedProduct2show = await productService.likeToggle(userId, productId);

  expect(findByIdSpy).toHaveBeenCalledTimes(1);
  expect(likeSpy).not.toHaveBeenCalled();
  expect(cancelLikeSpy).toHaveBeenCalledTimes(1);

  expect(response.isLiked).toBeFalsy();
  expect(response.id).toEqual(2);
  expect(response.likedUsers!.length).toEqual(1);
  expect(response.likedUsers!).toEqual(['user7']);
});
