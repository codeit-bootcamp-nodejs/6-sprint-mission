import userRepo from '../repository/user.repo';
import articleRepo from '../repository/article.repo';
import productRepo from '../repository/product.repo';
import { selectFields, selectUserFields } from '../lib/selectFields';
import {
  CompleteArticle,
  CompleteProduct,
  CompleteUser,
  ImagePostInput
} from '../types/interfaceType';
import { Prisma } from '@prisma/client';

import {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand
} from '@aws-sdk/client-s3';
import fs from 'fs';
import { s3Client } from '../lib/s3Client';
import { BUCKETNAME, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } from '../lib/constants';
import path from 'path';
import InternalServerError from '../middleware/errors/internalServerError';

const bucket = BUCKETNAME;
const region = REGION;

const repoMap = {
  products: productRepo,
  articles: articleRepo,
  users: userRepo
} as const;

async function getList(path: string, id: number) {
  const key = `images${path}/`;

  const command = new ListObjectsV2Command({ Bucket: bucket, Prefix: key });

  try {
    const data = await s3Client.send(command);

    const imageUrls = (data.Contents ?? []).map(
      (obj) => `https://${bucket}.s3.${region}.amazonaws.com/${obj.Key}`
    );
    return imageUrls;
  } catch (err) {
    throw new InternalServerError('S3 장애/권한 오류');
  }

  // DB에서 imageUrls 찾아 반환하는 경우 (현업에서 더 쓰는 방식이라 함)
  // const type = path.split('/')[1];
  // const repo = repoMap[type as keyof typeof repoMap];
  // const imageUrlsDB = await repo.findImgUrls(id);
  // return imageUrlsDB;
}

async function get(type: string, filename: string, id: number) {
  const key = `images/${type}/${id}/${filename}`;
  try {
    const imgObj = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    return imgObj;
  } catch (err) {
    throw new InternalServerError('AWS S3 fetch failure');
  }
}

async function post(input: ImagePostInput) {
  const { file, host, protocol } = input;

  // AWS S3에 이미지 저장
  const ext = path.extname(file.originalname);
  const key = `images${input.path}/${Date.now()}${ext}`;

  const params = {
    Bucket: BUCKETNAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  const command = new PutObjectCommand(params);
  try {
    await s3Client.send(command);
  } catch (err) {
    throw new InternalServerError('S3 업로드 실패');
  }

  // DB에 새 imageUrl 저장
  const type = input.path.split('/')[1];
  const repo = repoMap[type as keyof typeof repoMap];

  const imageUrls = await repo.findImgUrls(input.targetId);
  const newImageUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  let updatedUrls = [];
  if (imageUrls) {
    updatedUrls = [...imageUrls, newImageUrl]; // 기존 imageUrls에 이번 것 끝에 넣어줌
  } else {
    updatedUrls = [newImageUrl];
  }

  const imageData = { imageUrls: updatedUrls };
  const item = await repo.patch(input.targetId, imageData);
  if (type === 'users') return selectUserFields(item as CompleteUser, 'core');
  else return selectFields(item as CompleteProduct | CompleteArticle);
}

async function del(type: string, filename: string, id: number) {
  const key = `images/${type}/${id}/${filename}`;
  await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

  const repo = repoMap[type as keyof typeof repoMap];
  const delImgUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  const imageUrls = await repo.findImgUrls(id);

  const i = imageUrls.indexOf(delImgUrl);
  if (i !== -1) imageUrls.splice(i, 1);

  await repo.patch(id, { imageUrls });
  return imageUrls;
}

async function delList(type: string, id: number) {
  const key = `images/${type}/${id}/`;

  let command = new ListObjectsV2Command({ Bucket: bucket, Prefix: key });
  const list = await s3Client.send(command);

  if (list.Contents?.length) {
    await s3Client.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: list.Contents.map((obj) => ({ Key: obj.Key! }))
        }
      })
    );
  }

  const repo = repoMap[type as keyof typeof repoMap];
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
