import imageService from '../service/imageService.js';
import userService from '../service/userService.js';

// 이미지 목록 imageUrls 조회
// req.originalUrl로 서비스에서 product인지 article인지 구분
async function getList(req, res, next) {
  const item = await imageService.getList(req.originalUrl, req.params.id);
  console.log('');
  console.log('imageUrls fetched');
  console.log(item);
  console.log('');
  res.status(200).send(item);
}

// 이미지 등록
// 상품 이미지 저장 (현재는 로컬호스트에)
// 상품 이미지 Url을 기존 imageUrls 배열에 추가 (없다면 생성)
async function post(req, res, next) {
  const item = await imageService.post(
    req.originalUrl,
    req.params.id,
    req.protocol,
    req.file,
    req.get('host')
  );
  console.log('Image uploaded (url below). ImgUrls in DB updated.');
  console.log(item);
  res.status(201).send(item);
}

// imageUrls 삭제
// req.params에 productId 있어야 함
async function erase(req, res, next) {
  const item = await imageService.erase(req.originalUrl, req.params.id);
  console.log('ImageUrls deleted');
  res.status(200).send(item.imageUrls);
}

export default {
  getList,
  post,
  erase
};
