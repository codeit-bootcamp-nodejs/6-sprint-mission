import multer from 'multer';
import path from 'path';

//저장방식
const storage = multer.diskStorage({
  //도착지점. 데스티네이션 //cb = callback
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  //파일 명
  filename: (req, file, cb) => {
    //.png 확장자.
    const ext = path.extname(file.originalname);

    //파일이름
    const basename = path.basename(file.originalname);

    //파일이름_현재시간.확장자로 저장
    const newFileName = basename + '_' + Date.now() + ext;

    cb(null, newFileName);
  },
});

//규칙
const upload = multer({
  storage,
  //limits: {fileSize: 5 * 1024 *1024 } //예시 5MB 제한
});

export default upload;
