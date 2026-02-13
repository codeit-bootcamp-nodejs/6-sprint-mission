import { selectFields, selectUserFields } from '../lib/selectFields';
import {
  CompleteArticle,
  CompleteProduct,
  CompleteUser,
  ImagePostInput
} from '../types/interfaceType';
import { BASE_URL, BUCKETNAME, REGION } from '../lib/constants';
import path from 'path';
import { RepoMap, ImgSourceType } from '../types/interfaceType';
import imgStorage from '../storage/image.storage';

const bucket = BUCKETNAME;
const region = REGION;

async function getList(type: ImgSourceType, id: number) {
  const key = `images/${type}/${id}`;
  return await imgStorage.fetchImgList(key);

  // DB에서 imageUrls 찾아 반환하는 경우 (현업에서 더 쓰는 방식이라 함)
  // const repo = RepoMap[type];
  // const imageUrlsDB = await repo.findImgUrls(id);
  // console.log(imageUrlsDB);
  //return imageUrlsDB;
}

async function get(type: string, id: number, filename: string) {
  const key = `images/${type}/${id}/${filename}`;
  return await imgStorage.fetchImg(key);
}

//async function post(input: ImagePostInput) {
async function post(file: Express.Multer.File, type: ImgSourceType, id: number) {
  // AWS S3에 이미지 저장
  const ext = path.extname(file.originalname);
  const key = `images/${type}/${id}/${Date.now()}${ext}`;

  await imgStorage.saveImg(key, file);
  const newImageUrl = `${BASE_URL}/${key}`;

  // DB에 새 imageUrl 저장
  const repo = RepoMap[type];
  let imageUrls = await repo.findImgUrls(id);
  imageUrls.push(newImageUrl);

  const item = await repo.patch(id, { imageUrls });
  if (type === 'users') return selectUserFields(item as CompleteUser, 'core');
  else return selectFields(item as CompleteProduct | CompleteArticle);
}

async function del(type: ImgSourceType, id: number, filename: string) {
  const key = `images/${type}/${id}/${filename}`;
  await imgStorage.delImg(key);
  const delImgUrl = `${BASE_URL}/${key}`;

  const repo = RepoMap[type];
  const imageUrls = await repo.findImgUrls(id);

  const i = imageUrls.indexOf(delImgUrl);
  if (i !== -1) imageUrls.splice(i, 1);

  const item = await repo.patch(id, { imageUrls });
  if (type === 'users') return selectUserFields(item as CompleteUser, 'core');
  else return selectFields(item as CompleteProduct | CompleteArticle);
}

async function delList(type: ImgSourceType, id: number) {
  const key = `images/${type}/${id}/`;
  await imgStorage.delImgList(key);

  const repo = RepoMap[type];
  const item = await repo.patch(id, { imageUrls: [] });
  if (type === 'users') return selectUserFields(item as CompleteUser, 'core');
  else return selectFields(item as CompleteProduct | CompleteArticle);
}

export default {
  getList,
  get,
  post,
  del,
  delList
};
