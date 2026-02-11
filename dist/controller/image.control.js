"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_service_1 = __importDefault(require("../service/image.service"));
const NotFoundError_1 = __importDefault(require("../middleware/errors/NotFoundError"));
const BadRequestError_1 = __importDefault(require("../middleware/errors/BadRequestError"));
// 이미지 목록 imageUrls 조회, 개발 위해 현재는 전체 상품/게시물 출력.
// req.originalUrl로 서비스에서 product인지 article인지 구분
function getList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { type } = req.params;
        const imageUrls = yield image_service_1.default.getList(type, Number(id));
        console.log('imageUrls fetched');
        console.log(imageUrls);
        console.log('');
        res.status(200).json(imageUrls);
    });
}
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { id, filename } = req.params;
        const { type } = req.params;
        const imgObj = yield image_service_1.default.get(type, Number(id), filename);
        if (!imgObj.Body)
            throw new Error('Image body not found');
        res.setHeader('Content-Type', (_a = imgObj.ContentType) !== null && _a !== void 0 ? _a : 'application/octet-stream');
        const bytes = yield imgObj.Body.transformToByteArray();
        res.end(Buffer.from(bytes));
    });
}
// 이미지 등록
// 상품 이미지 저장 (현재는 로컬호스트에)
// 상품 이미지 Url을 기존 imageUrls 배열에 추가 (없다면 생성)
function post(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.file)
            throw new BadRequestError_1.default('이미지 화일이 존재하지 않습니다');
        const { id } = req.params;
        const { type } = req.params;
        const { buffer, mimetype, originalname, size } = req.file;
        const item = yield image_service_1.default.post({
            type,
            id: Number(id),
            file: {
                buffer,
                mimetype,
                originalname,
                size
            }
        });
        if (!item)
            throw new NotFoundError_1.default();
        res.status(201).json(item);
    });
}
// imageUrls 삭제
function delList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { type } = req.params;
        const item = yield image_service_1.default.delList(type, Number(id));
        res.status(204).send({ message: '이미지가 삭제되었습니다' });
    });
}
function del(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, filename } = req.params;
        const { type } = req.params;
        const item = yield image_service_1.default.del(type, Number(id), filename);
        res.status(204).send({ message: '이미지가 삭제되었습니다' });
    });
}
exports.default = {
    getList,
    get,
    post,
    del,
    delList
};
