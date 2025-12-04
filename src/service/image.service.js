import path from 'path';
import { PUBLIC_IMG_PATH, STATIC_IMG_PATH } from '../lib/constants.js';
import userRepo from '../repository/user.repo.js';
import articleRepo from '../repository/article.repo.js';
import productRepo from '../repository/product.repo.js';
import { selectArticleProductFields, selectUserFields } from '../lib/selectFields.js';

async function get(originalUrl, id) {
  let item = {};
  if (originalUrl.includes('users')) {
    item = await userRepo.findById(Number(id));
  } else if (originalUrl.includes('products')) {
    item = await productRepo.findById(Number(id));
  } else {
    item = await articleRepo.findById(Number(id));
  }
  if (originalUrl.includes('users')) return selectUserFields(item, 'core');
  else return selectArticleProductFields(item);
}

async function post(originalUrl, id, protocol, file, host) {
  // 업로드된 파일을 접근 가능한 URL생성해서 응답으로 반환

  let staticPath = '';
  let publicPath = '';
  let item = {};

  if (originalUrl.includes('products')) {
    staticPath = path.join(STATIC_IMG_PATH, '/product'); // 이미지 저장 폴더 설정: 현재는 localhost
    publicPath = path.join(PUBLIC_IMG_PATH, '/product');
    item = await productRepo.findById(Number(id)); // DB에서 imageUrls 배열 가져옴
  }
  if (originalUrl.includes('articles')) {
    staticPath = path.join(STATIC_IMG_PATH, '/article');
    publicPath = path.join(PUBLIC_IMG_PATH, '/article');
    item = await articleRepo.findById(Number(id));
  }
  if (originalUrl.includes('users')) {
    staticPath = path.join(STATIC_IMG_PATH, '/user');
    publicPath = path.join(PUBLIC_IMG_PATH, '/user');
    item = await userRepo.findById(Number(id));
  }

  // if (!fs.existsSync(staticPath)) {
  //   fs.mkdirSync(staticPath, { recursive: true }); //이미지 저장 폴더 없으면 생성
  //   console.log('이미지 소스 폴더 생성');
  // }

  //path.posix.join() : 여러개의 문자열 인자를 받아 하나의 경로 문자열로 만듬(운영체제에 관계없이 일관된 경로형식 유지)
  const newImageUrl = file
    ? `${protocol}://${host}${path.posix.join(publicPath, file.filename)}`
    : null;
  console.log(item.imageUrls);
  const updatedUrls = [...item.imageUrls, newImageUrl]; // 기존 imageUrls에 이번 것 끝에 넣어줌

  if (originalUrl.includes('products'))
    item = await productRepo.patch(Number(id), { imageUrls: updatedUrls });
  if (originalUrl.includes('articles'))
    item = await articleRepo.patch(Number(id), { imageUrls: updatedUrls });
  if (originalUrl.includes('users'))
    item = await userRepo.patch(Number(id), { imageUrls: updatedUrls });

  if (originalUrl.includes('users')) return selectUserFields(item, 'core');
  else return selectArticleProductFields(item);
}

async function erase(originalUrl, id) {
  let item = {};
  if (originalUrl.includes('products'))
    item = await productRepo.patch(Number(id), { imageUrls: [] });
  if (originalUrl.includes('articles'))
    item = await articleRepo.patch(Number(id), { imageUrls: [] });
  if (originalUrl.includes('users')) item = await userRepo.patch(Number(id), { imageUrls: [] });

  if (originalUrl.includes('users')) return selectUserFields(item, 'core');
  else return selectArticleProductFields(item);
}

export default {
  get,
  post,
  erase
};
