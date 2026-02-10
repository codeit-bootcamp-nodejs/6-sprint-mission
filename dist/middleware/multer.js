"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const BadRequestError_1 = __importDefault(require("./errors/BadRequestError"));
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
// multer 인스터스 생성 -> 라우터에서 미들웨어로 사용
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
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
