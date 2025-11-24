import express from 'express';
import upload from '../middlewares/uploadImages.js';

const router = express.Router();

//사진 받는 곳.
router
  .route('/')
  //post
  .post(upload.single('image'), (req, res) => {
    //주방장! 재료비었으면
    if (!req.file) {
      return res.status(400).send({ message: '이미지를 등록해주세요' });
    }

    res
      .status(201)
      .send({ message: '이미지가 정상적으로 등록되었습니다.', filePath: req.file.path });
  });

export default router;
