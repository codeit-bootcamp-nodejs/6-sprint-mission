import { Request, Response } from 'express';
import { putImage, getS3Url } from '../utils/s3Handler';
import { HttpError } from '../utils/errors';
import path from 'path';
import crypto from 'crypto';

export class FileController {
  static uploadFile = async (req: Request, res: Response) => {
    // 다중 파일 업드: req.files (배열)
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new HttpError(400, '파일이 없습니다.');
    }

    // 폴더명 결정 (쿼리 파라미터는 필수이므로 항상 값이 존재함)
    const folder = req.query.folder;

    // 프로필 이미지는 1장만 허용
    if (folder === 'profiles' && files.length > 1) {
      throw new HttpError(400, '프로필 이미지는 최대 1장까지만 업로드 가능합니다.');
    }

    // 모든 파일을 병렬로 업로드
    const uploadPromises = files.map(async (file) => {
      const unique = crypto.randomBytes(16).toString('hex');
      const ext = path.extname(file.originalname);
      const key = `${folder}/${unique}${ext}`;

      // 1. S3 업로드
      await putImage(key, file.buffer, file.mimetype);

      // 2. 개발 환경일 경우 로컬 백업 저장 (uploads 폴더)
      //    로컬 환경일 때만 파일 시스템에 저장 (EC2 등에서는 저장 안 함)
      if (process.env.IS_LOCAL === 'true') {
        const fs = await import('fs/promises'); // 동적 임포트: 프로덕션 환경에서는 fs 모듈을 로드하지 않아 리소스를 절약함
        const uploadDir = path.join(process.cwd(), 'uploads', folder as string);

        // 폴더가 없으면 생성 (recursive: true -> 중간 폴더도 생성)
        await fs.mkdir(uploadDir, { recursive: true });

        // 파일 쓰기
        await fs.writeFile(path.join(uploadDir, `${unique}${ext}`), file.buffer);
      }

      const url = getS3Url(key);
      /* 
      클라이언트에서 업로드된 파일에 접근 해야하기 때문에 Key와 URL 모두 반환
      key -> DB에 저장할 상대경로
      url -> 클라이언트에서 파일에 접근할 때 사용할 절대경로
      */
      return { key, url };
    });

    const results = await Promise.all(uploadPromises);

    // 업로드된 파일 정보 목록 반환
    res.status(201).send(results);
  };
}
