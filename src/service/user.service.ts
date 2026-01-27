import userRepo from '../repository/user.repo';
import { NODE_ENV } from '../lib/constants';
import { assert } from 'superstruct';
import { PatchUser } from '../struct/user.struct';
import { print, isEmpty } from '../lib/myFuns';
import { selectUserFields } from '../lib/selectFields';
import { SafeCompleteUser } from '../types/interfaceType';
import { filterPassword, hashingPassword, check_passwordValidity } from './auth.service';
import BadRequestError from '../middleware/errors/BadRequestError';
import NotFoundError from '../middleware/errors/NotFoundError';
import ForbiddenError from '../middleware/errors/ForbiddenError';

async function getList(): Promise<SafeCompleteUser[] | object> {
  if (NODE_ENV === 'development') {
    const users = await userRepo.getList();
    if (!users) throw new NotFoundError();
    return filterPassword(users);
  } else {
    return { message: '개발자 옵션 입니다' };
  }
}

async function getInfo(userId: number): Promise<Omit<SafeCompleteUser, 'updatedAt'>> {
  const user = await userRepo.findById(userId);
  return selectUserFields(user, 'all');
}

async function patchInfo(
  userId: number,
  userData: object
): Promise<Omit<SafeCompleteUser, 'updatedAt'>> {
  assert(userData, PatchUser);
  const user = await userRepo.patch(userId, userData);
  return selectUserFields(user, 'core');
}

async function patchPassword(
  userId: number,
  oldPassword: string,
  newPassword: string
): Promise<Omit<SafeCompleteUser, 'updatedAt'>> {
  const user = await userRepo.findById(userId);
  if (!(await check_passwordValidity(oldPassword, user.password))) {
    print('Invalid current password');
    throw new ForbiddenError('비밀번호가 틀렸습니다');
  }

  // 현재 패스워드 입력을 요구하므로 비교는 불필요하지만 넣어 보았음
  if (await check_passwordValidity(newPassword, user.password)) {
    print('Invalid new password: same');
    throw new BadRequestError('비밀번호가 같습니다');
  }

  const userData = { password: await hashingPassword(newPassword) };
  assert(userData, PatchUser);
  const newUser = await userRepo.patch(Number(userId), userData);
  return selectUserFields(newUser, 'core');
}

async function getProducts(userId: number): Promise<Omit<SafeCompleteUser, 'updatedAt'>> {
  const user = await userRepo.findById(userId);
  const selectedInfo = selectUserFields(user, 'myProducts');
  if (isEmpty(selectedInfo)) {
    print(`No products registered by user_${userId}`);
    throw new NotFoundError();
  }
  return selectedInfo;
}

async function getArticles(userId: number): Promise<Omit<SafeCompleteUser, 'updatedAt'>> {
  const user = await userRepo.findById(userId);
  const selectedInfo = selectUserFields(user, 'myArticles');
  // console.log(selectedInfo);
  // console.log(isEmpty(selectedInfo));
  if (isEmpty(selectedInfo)) {
    print(`No articles registered by user_${userId}`);
    throw new NotFoundError();
  }
  return selectedInfo;
}

async function getLikedProducts(userId: number): Promise<Omit<SafeCompleteUser, 'updatedAt'>> {
  const user = await userRepo.findById(userId);
  if (isEmpty(user.likedProducts)) {
    print(`No products liked by user_${userId}`);
    throw new NotFoundError();
  }
  return selectUserFields(user, 'likedProducts');
}

async function getLikedArticles(userId: number): Promise<Omit<SafeCompleteUser, 'updatedAt'>> {
  const user = await userRepo.findById(userId);
  if (isEmpty(user.likedArticles)) {
    print(`No articles liked by user_${userId}`);
    throw new NotFoundError();
  }
  return selectUserFields(user, 'likedArticles');
}

export default {
  getList,
  getInfo,
  patchInfo,
  patchPassword,
  getProducts,
  getArticles,
  getLikedProducts,
  getLikedArticles
};
