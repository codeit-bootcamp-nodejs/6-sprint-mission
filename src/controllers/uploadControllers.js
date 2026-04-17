// path 모듈을 가져옵니다 (파일 경로 처리를 위해)
import path from 'path';

// 이미지 업로드 관련 기능을 담당하는 컨트롤러 (arrow function)
const UploadController = {
  // 이미지를 업로드하는 함수입니다
  uploadImage: async (req, res) => {
    try {
      // 업로드된 파일이 있는지 확인합니다
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: '이미지 파일이 필요합니다.',
        });
      }

      // 업로드된 파일의 경로를 생성합니다
      const imagePath = `/uploads/${req.file.filename}`;
      const fullUrl = `${req.protocol}://${req.get('host')}${imagePath}`;

      // 성공 응답을 보냅니다
      res.json({
        success: true,
        message: '이미지가 성공적으로 업로드되었습니다.',
        data: {
          filename: req.file.filename, // 저장된 파일명
          originalName: req.file.originalname, // 원본 파일명
          path: imagePath, // 서버 내 파일 경로
          url: fullUrl, // 전체 URL
          size: req.file.size, // 파일 크기 (바이트)
          mimetype: req.file.mimetype, // 파일 타입
        },
      });
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      res.status(500).json({
        success: false,
        message: '이미지 업로드 중 오류가 발생했습니다.',
        error: error.message,
      });
    }
  },
};

export default UploadController;
