import express from 'express';
import multer from 'multer';
import {
  postProductImage, // 상풍 이미지 등록
  getProductImageList, // 상풍 이미지 목록 조회
  deleteProductImageList, // 상품 이미지 목록 삭제
  postArticleImage, // 게시물 이미지 등록
  getArticleImageList, // 게시물 이미지 목록 조회
  deleteArticleImageList // 게시물 이미지 목록 삭제
} from '../controller/imageController.js';

const imageRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

imageRouter.get('/products/:productId', getProductImageList);
imageRouter.post('/products/:productId', upload.single('image'), postProductImage);
imageRouter.delete('/products/:productId', deleteProductImageList);
imageRouter.get('/articles/:articleId', getArticleImageList);
imageRouter.post('/articles/:articleId', upload.single('image'), postArticleImage);
imageRouter.delete('/articles/:articleId', deleteArticleImageList);

export default imageRouter;

// imageUrls String[]? 로 스키마에 정의되어 있어
// 전체 삭제는 가능하지만, 개별 삭제가 어려움
// 스키마에 image 모델 만드는 게 나을 듯함
