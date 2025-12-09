import { Request, Response, NextFunction } from 'express';
import imageService from '../service/image.service';
import NotFoundError from '../middleware/errors/NotFoundError';
import BadRequestError from '../middleware/errors/BadRequestError';

// 이미지 목록 imageUrls 조회, 개발 위해 현재는 전체 상품/게시물 출력.
// req.originalUrl로 서비스에서 product인지 article인지 구분
async function get(req: Request, res: Response, next: NextFunction) {
  const item = await imageService.get(req.originalUrl, req.params.id);
  console.log('imageUrls fetched');
  console.log(item.imageUrls);
  console.log('');
  res.status(200).json(item);
}

// 이미지 등록
// 상품 이미지 저장 (현재는 로컬호스트에)
// 상품 이미지 Url을 기존 imageUrls 배열에 추가 (없다면 생성)
async function post(req: Request, res: Response, next: NextFunction) {
  if (!req.file) throw new BadRequestError('IMAGE_FILE_NOT_FOUND');

  const item = await imageService.post(
    req.originalUrl,
    req.params.id,
    req.protocol,
    req.file,
    req.get('host')
  );
  if (!item) throw new NotFoundError('User/Product/Article', Number(req.params.id));

  console.log('Image uploaded. ImgUrls in DB updated.');
  console.log(item.imageUrls);
  console.log('');
  res.status(201).json(item);
}

// imageUrls 삭제
async function erase(req: Request, res: Response, next: NextFunction) {
  const item = await imageService.erase(req.originalUrl, req.params.id);
  console.log('ImageUrls deleted');
  res.status(200).json(item); // json/send?
}

export default {
  get,
  post,
  erase
};
