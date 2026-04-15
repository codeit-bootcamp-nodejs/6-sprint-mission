import { jest } from '@jest/globals';
import { productService } from '../services/product-service.js';
import { productRepo } from '../repositories/product-repository.js';

describe('Product service (유닛 단위 테스트)', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('목록 조회는 필터링된 쿼리로 저장소를 호출한다', async () => {
    const spy = jest.spyOn(productRepo, 'findProducts').mockResolvedValue([]);

    await productService.list({
      q: '테스트',
      tag: 'FASHION',
      offset: '0',
      limit: '10',
      order: 'recent',
    });

    expect(spy).toHaveBeenCalledTimes(1);
    const call = spy.mock.calls[0] as Parameters<
      typeof productRepo.findProducts
    >;
    const [where] = call;
    expect(where).toEqual(
      expect.objectContaining({
        tags: 'FASHION',
        OR: expect.any(Array),
      })
    );
  });
});
