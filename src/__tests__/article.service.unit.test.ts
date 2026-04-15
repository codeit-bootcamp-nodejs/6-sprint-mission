import { jest } from '@jest/globals';
import { ValidationError } from '../core/error/error-handler.js';
import { articleRepo } from '../repositories/article-repository.js';
import { articleService } from '../services/article-service.js';

describe('Article service (유닛 단위 테스트)', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('목록 조회는 정렬/검색 조건을 저장소에 전달한다', async () => {
    const spy = jest.spyOn(articleRepo, 'findArticles').mockResolvedValue([]);

    await articleService.list({
      q: '테스트',
      offset: '0',
      limit: '10',
      order: 'recent',
    });

    expect(spy).toHaveBeenCalledTimes(1);
    const [where, orderBy, skip, take] = spy.mock.calls[0] as Parameters<
      typeof articleRepo.findArticles
    >;

    expect(where).toEqual(
      expect.objectContaining({
        OR: expect.any(Array),
      })
    );
    expect(orderBy).toEqual({ createdAt: 'desc' });
    expect(skip).toBe(0);
    expect(take).toBe(10);
  });

  test('지원하지 않는 정렬 키면 ValidationError를 던진다', async () => {
    await expect(
      articleService.list({
        order: 'unknown-order',
      })
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
