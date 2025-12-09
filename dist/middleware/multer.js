"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("../lib/constants");
const BadRequestError_1 = __importDefault(require("./errors/BadRequestError"));
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
// multer 인스터스 생성 -> 라우터에서 미들웨어로 사용
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            let publicPath = '';
            if (req.originalUrl.includes('products'))
                publicPath = path_1.default.join(constants_1.STATIC_IMG_PATH, 'product');
            if (req.originalUrl.includes('articles'))
                publicPath = path_1.default.join(constants_1.STATIC_IMG_PATH, 'article');
            if (req.originalUrl.includes('users'))
                publicPath = path_1.default.join(constants_1.STATIC_IMG_PATH, 'user');
            // if (!fs.existsSync(publicPath)) {
            //   fs.mkdirSync(publicPath, { recursive: true }); //이미지 저장 폴더 없으면 생성
            //   console.log('이미지 저장 폴더 생성');
            // }
            cb(null, publicPath); // 저장 폴더 설정
        },
        filename(req, file, cb) {
            cb(null, file.originalname); //저장될 이미지명: 원래 것
        }
    }),
    limits: { fileSize: FILE_SIZE_LIMIT }, // 파일 크기 설정
    fileFilter: function (req, file, cb) {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            const err = new BadRequestError_1.default('png, jpeg, jpg 확장자만 가능합니다.');
            return cb(err); //파일 확장자 확인
        }
        cb(null, true);
    }
});
exports.default = upload;
