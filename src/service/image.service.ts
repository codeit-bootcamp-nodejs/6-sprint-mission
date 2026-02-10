import { selectFields, selectUserFields } from '../lib/selectFields';
import {
  CompleteArticle,
  CompleteProduct,
  CompleteUser,
  ImagePostInput
} from '../types/interfaceType';

import {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand
} from '@aws-sdk/client-s3';
import { s3Client } from '../lib/s3Client';
import { BUCKETNAME, REGION } from '../lib/constants';
import path from 'path';
import InternalServerError from '../middleware/errors/internalServerError';
import { RepoMap, ImgSourceType } from '../types/interfaceType';

const bucket = BUCKETNAME;
const region = REGION;

async function getList(type: ImgSourceType, id: number) {
  const key = `images/${type}/${id}/`;

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
  //   const repo = RepoMap[type];
  //   const imageUrlsDB = await repo.findImgUrls(id);
  //   return imageUrlsDB;
}

async function get(type: string, id: number, filename: string) {
  const key = `images/${type}/${id}/${filename}`;

  try {
    const imgObj = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    return imgObj;
  } catch (err) {
    throw new InternalServerError('AWS S3 fetch failure');
  }
}

async function post(input: ImagePostInput) {
  const { type: imgType, id, file } = input;

  // AWS S3에 이미지 저장
  const ext = path.extname(file.originalname);
  const key = `images/${imgType}/${id}/${Date.now()}${ext}`;

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
    throw new InternalServerError('AWS S3 upload failure');
  }

  // DB에 새 imageUrl 저장
  const repo = RepoMap[imgType];

  const imageUrls = await repo.findImgUrls(input.id);
  const newImageUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  let updatedUrls = [];
  if (imageUrls) {
    updatedUrls = [...imageUrls, newImageUrl]; // 기존 imageUrls에 이번 것 끝에 넣어줌
  } else {
    updatedUrls = [newImageUrl];
  }

  const imageData = { imageUrls: updatedUrls };
  const item = await repo.patch(input.id, imageData);
  if (imgType === 'users') return selectUserFields(item as CompleteUser, 'core');
  else return selectFields(item as CompleteProduct | CompleteArticle);
}

async function del(type: ImgSourceType, id: number, filename: string) {
  const key = `images/${type}/${id}/${filename}`;
  await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

  const repo = RepoMap[type];
  const delImgUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  const imageUrls = await repo.findImgUrls(id);

  const i = imageUrls.indexOf(delImgUrl);
  if (i !== -1) imageUrls.splice(i, 1);

  const item = await repo.patch(id, { imageUrls });
  if (type === 'users') return selectUserFields(item as CompleteUser, 'core');
  else return selectFields(item as CompleteProduct | CompleteArticle);
}

async function delList(type: ImgSourceType, id: number) {
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
