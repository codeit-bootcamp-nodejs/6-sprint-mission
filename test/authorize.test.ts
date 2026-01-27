const makeRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.locals = {};
  return res;
};

const next = jest.fn();

import authorize from '../src/middleware/authorize';
import * as permissionService from '../src/services/permissionService';

describe('authorize middleware', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('권한 없으면 403', async () => {
    jest.spyOn(permissionService, 'canAccess').mockResolvedValue(false);

    const req: any = { user: { id: 2 }, params: { id: '10' } };
    const res = makeRes();
    const next = jest.fn();

    await authorize(req, res, next);

    expect(permissionService.canAccess).toHaveBeenCalledWith(2, 10);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test('권한 있으면 next()', async () => {
    jest.spyOn(permissionService, 'canAccess').mockResolvedValue(true);

    const req: any = { user: { id: 1 }, params: { id: '10' } };
    const res = makeRes();
    const next = jest.fn();

    await authorize(req, res, next);

    expect(permissionService.canAccess).toHaveBeenCalledWith(1, 10);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
