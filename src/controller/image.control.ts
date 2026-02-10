import { Request, Response, NextFunction } from 'express';
import imageService from '../service/image.service';
import NotFoundError from '../middleware/errors/NotFoundError';
import BadRequestError from '../middleware/errors/BadRequestError';
import { NODE_ENV } from '../lib/constants';
import { ImgSourceType } from '../types/interfaceType';

// 이미지 목록 imageUrls 조회, 개발 위해 현재는 전체 상품/게시물 출력.
// req.originalUrl로 서비스에서 product인지 article인지 구분
async function getList(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  const { type } = req.params as { type: ImgSourceType };
  const imageUrls = await imageService.getList(type, Number(id));
  console.log('imageUrls fetched');
  console.log(imageUrls);
  console.log('');
  res.status(200).json(imageUrls);
}

async function get(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id, filename } = req.params;
  const { type } = req.params as { type: ImgSourceType };

  const imgObj = await imageService.get(type, Number(id), filename);
  if (!imgObj.Body) throw new Error('Image body not found');

  res.setHeader('Content-Type', imgObj.ContentType ?? 'application/octet-stream');
  if (NODE_ENV == 'development') console.log('image fetched');

  const bytes = await imgObj.Body.transformToByteArray();
  res.end(Buffer.from(bytes));
}

// 이미지 등록
// 상품 이미지 저장 (현재는 로컬호스트에)
// 상품 이미지 Url을 기존 imageUrls 배열에 추가 (없다면 생성)
async function post(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.file) throw new BadRequestError('이미지 화일이 존재하지 않습니다');
  const { id } = req.params;
  const { type } = req.params as { type: ImgSourceType };

  const { buffer, mimetype, originalname, size } = req.file;
  const item = await imageService.post({
    type,
    id: Number(id),
    file: {
      buffer,
      mimetype,
      originalname,
      size
    }
  });
  if (!item) throw new NotFoundError();

  if (NODE_ENV == 'development') {
    console.log('Image uploaded in AWS S3. ImgUrls in DB updated.');
    console.log(item.imageUrls);
    console.log('');
  }
  res.status(201).json(item);
}

// imageUrls 삭제
async function delList(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  const { type } = req.params as { type: ImgSourceType };

  const item = await imageService.delList(type, Number(id));
  if (NODE_ENV == 'development') {
    console.log(item);
    console.log('ImageUrls deleted');
  }
  res.status(204).send({ message: '이미지가 삭제되었습니다' });
}

async function del(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id, filename } = req.params;
  const { type } = req.params as { type: ImgSourceType };
  const item = await imageService.del(type, Number(id), filename);
  if (NODE_ENV == 'development') {
    console.log(item);
    console.log('ImageUrls deleted');
  }
  res.status(204).send({ message: '이미지가 삭제되었습니다' });
}

export default {
  getList,
  get,
  post,
  del,
  delList
};
