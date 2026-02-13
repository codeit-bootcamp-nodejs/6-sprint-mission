import path from 'path';
import fs, { mkdir, writeFile } from 'fs/promises';
import mime from 'mime-types';
import { NODE_ENV, STATIC_IMG_PATH, BUCKETNAME, REGION, BASE_URL } from '../lib/constants';
import InternalServerError from '../middleware/errors/internalServerError';
import { ImageFile, ImageResult } from '../types/interfaceType';
import { s3Client } from '../lib/s3Client';
import {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand
} from '@aws-sdk/client-s3';

const bucket = BUCKETNAME;
const region = REGION;

async function fetchImgList(key: string) {
  if (NODE_ENV === 'production') {
    const command = new ListObjectsV2Command({ Bucket: bucket, Prefix: key });
    try {
      const data = await s3Client.send(command);
      return (data.Contents ?? []).map((obj) => `${BASE_URL}/${obj.Key}`);
    } catch (err) {
      throw new InternalServerError('AWS S3 fetch failure');
    }
  } else {
    const dir = path.join(STATIC_IMG_PATH, key);
    try {
      const files = await fs.readdir(dir);
      return files.map((name) => `${BASE_URL}/${key}/${name}`);
    } catch {
      return []; //없으면 빈 배열 반환
    }
  }
}

async function fetchImg(key: string): Promise<ImageResult> {
  if (NODE_ENV === 'production') {
    try {
      const imgObj = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
      const bytes = await imgObj.Body!.transformToByteArray();

      return {
        body: Buffer.from(bytes),
        contentType: imgObj.ContentType ?? 'application/octet-stream'
      };
    } catch (err) {
      throw new InternalServerError('AWS S3 fetch failure');
    }
  } else {
    const fullPath = path.join(STATIC_IMG_PATH, key);
    const buffer = await fs.readFile(fullPath);

    return {
      body: buffer,
      contentType: mime.lookup(fullPath) || 'application/octet-stream'
    };
  }
}

async function saveImg(key: string, file: ImageFile) {
  if (NODE_ENV === 'production') {
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
  } else {
    const fullPath = path.join(STATIC_IMG_PATH, key);
    await mkdir(path.dirname(fullPath), { recursive: true });
    await writeFile(fullPath, file.buffer);
  }
}

async function delImg(key: string) {
  if (NODE_ENV === 'production') {
    try {
      await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    } catch (err) {
      throw new InternalServerError('AWS S3 deletion failure');
    }
  } else {
    try {
      const filePath = path.join(STATIC_IMG_PATH, key);
      await fs.unlink(filePath);
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        throw new InternalServerError('Local file deletion failure');
      }
    }
  }
}

async function delImgList(key: string) {
  if (NODE_ENV === 'production') {
    try {
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
    } catch (err) {
      throw new InternalServerError('AWS S3 deletion failure');
    }
  } else {
    try {
      const dir = path.join(STATIC_IMG_PATH, key);
      await fs.rm(dir, {
        recursive: true,
        force: true // ENOENT 자동 무시
      });
    } catch (err: any) {
      throw new InternalServerError('Local file deletion failure');
    }
  }
}

export default {
  fetchImgList,
  fetchImg,
  saveImg,
  delImg,
  delImgList
};
