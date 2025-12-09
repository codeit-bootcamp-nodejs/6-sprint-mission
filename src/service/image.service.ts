import path from 'path';
import { PUBLIC_IMG_PATH, STATIC_IMG_PATH } from '../lib/constants';
import userRepo from '../repository/user.repo';
import articleRepo from '../repository/article.repo';
import productRepo from '../repository/product.repo';
import { selectProductFields, selectArticleFields, selectUserFields } from '../lib/selectFields';
import { completeArticle, completeProduct, completeUser } from '../dto/interfaceType';
import { Prisma, Article, Product, User } from '@prisma/client';

async function get(originalUrl: string, id: string) {
  let item = {};
  if (originalUrl.includes('users')) {
    item = await userRepo.findById(Number(id));
    return selectUserFields(item as completeUser, 'core');
  } else if (originalUrl.includes('products')) {
    item = await productRepo.findById(Number(id));
    return selectProductFields(item as completeProduct);
  } else {
    item = await articleRepo.findById(Number(id));
    return selectArticleFields(item as completeArticle);
  }
}

async function post(
  originalUrl: string,
  id: string,
  protocol: string,
  file: Express.Multer.File | undefined,
  host: string | undefined
) {
  // 업로드된 파일을 접근 가능한 URL생성해서 응답으로 반환
  let staticPath = '';
  let publicPath = '';
  let item = {};

  if (originalUrl.includes('products')) {
    staticPath = path.join(STATIC_IMG_PATH, '/product'); // 이미지 저장 폴더 설정: 현재는 localhost
    publicPath = path.join(PUBLIC_IMG_PATH, '/product'); // 위 폴더를 가리키는 public용 라우터 폴더
    item = (await productRepo.findById(Number(id))) as Product;
  }
  if (originalUrl.includes('articles')) {
    staticPath = path.join(STATIC_IMG_PATH, '/article');
    publicPath = path.join(PUBLIC_IMG_PATH, '/article');
    item = (await articleRepo.findById(Number(id))) as Article;
  }
  if (originalUrl.includes('users')) {
    staticPath = path.join(STATIC_IMG_PATH, '/user');
    publicPath = path.join(PUBLIC_IMG_PATH, '/user');
    item = (await userRepo.findById(Number(id))) as User;
  }

  const newImageUrl = file
    ? `${protocol}://${host}${path.posix.join(publicPath, file.filename)}`
    : null;

  let updatedUrls = [];
  if ('imageUrls' in item) {
    updatedUrls = [...(item.imageUrls as string[]), newImageUrl]; // 기존 imageUrls에 이번 것 끝에 넣어줌
  } else {
    updatedUrls = [newImageUrl];
  }

  const imageData = { imageUrls: updatedUrls };

  if (originalUrl.includes('products')) {
    item = await productRepo.patch(Number(id), imageData as Prisma.ProductUpdateInput);
    return selectProductFields(item as Product);
  }
  if (originalUrl.includes('articles')) {
    item = await articleRepo.patch(Number(id), imageData as Prisma.ArticleUpdateInput);
    return selectArticleFields(item as Article);
  }
  if (originalUrl.includes('users')) {
    item = await userRepo.patch(Number(id), imageData as Prisma.UserUpdateInput);
    return selectUserFields(item as User, 'core');
  }
}

async function erase(originalUrl: string, id: string) {
  let item = {};
  if (originalUrl.includes('products')) {
    item = await productRepo.patch(Number(id), { imageUrls: [] });
    return selectProductFields(item as Product);
  }
  if (originalUrl.includes('articles')) {
    item = await articleRepo.patch(Number(id), { imageUrls: [] });
    return selectArticleFields(item as Article);
  }
  if (originalUrl.includes('users')) {
    item = await userRepo.patch(Number(id), { imageUrls: [] });
    return selectUserFields(item as User, 'core');
  }
}

export default {
  get,
  post,
  erase
};
