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
const image_service_js_1 = __importDefault(require("../service/image.service.js"));
// 이미지 목록 imageUrls 조회, 개발 위해 현재는 전체 상품/게시물 출력.
// req.originalUrl로 서비스에서 product인지 article인지 구분
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield image_service_js_1.default.get(req.originalUrl, req.params.id);
        console.log('imageUrls fetched');
        console.log(item.imageUrls);
        console.log('');
        res.status(200).json(item);
    });
}
// 이미지 등록
// 상품 이미지 저장 (현재는 로컬호스트에)
// 상품 이미지 Url을 기존 imageUrls 배열에 추가 (없다면 생성)
function post(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield image_service_js_1.default.post(req.originalUrl, req.params.id, req.protocol, req.file, req.get('host'));
        console.log('Image uploaded. ImgUrls in DB updated.');
        console.log(item.imageUrls);
        console.log('');
        res.status(201).json(item);
    });
}
// imageUrls 삭제
function erase(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield image_service_js_1.default.erase(req.originalUrl, req.params.id);
        console.log('ImageUrls deleted');
        res.status(200).json(item); // json/send?
    });
}
exports.default = {
    get,
    post,
    erase
};
