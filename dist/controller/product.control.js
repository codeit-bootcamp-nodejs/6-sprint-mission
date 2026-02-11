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
const product_service_1 = __importDefault(require("../service/product.service"));
// 상품 등록: 토큰 인증된 유저만 가능
// 입력 필드: name, description, price, tags
function post(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, price, tags } = req.body;
        const productData = {
            userId: req.user.id,
            name: name.trim(),
            description: description.trim(),
            price: price,
            tags: tags
        };
        const [product, priceRecord] = yield product_service_1.default.post(productData);
        res.status(201).json(product);
    });
}
// 상품 수정: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
function patch(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, description, price, tags } = req.body;
        const productData = {
            name: name ? name.trim() : undefined,
            description: description ? description.trim() : undefined,
            price: price !== null && price !== void 0 ? price : undefined,
            tags: tags !== null && tags !== void 0 ? tags : undefined
        };
        const product = yield product_service_1.default.patch(Number(id), productData);
        res.status(200).json(product);
    });
}
// 상품 삭제: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
function erase(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield product_service_1.default.erase(Number(id));
        res.status(204).send({ message: '상품이 삭제되었습니다' });
    });
}
// 상품 목록 조회
// 조회 필드: id, name, price, createdAt
// 페이지네이션: offset 방식 (default: offset=0, limit=10)
// 조회순: order='recent'(default)/'oldest'
// 조건 검색: namd and/or description에 포함된 단어
function getList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        const order = req.query.order || 'recent';
        const name = req.query.name;
        const description = req.query.description;
        const products = yield product_service_1.default.getList(offset, limit, order, name, description);
        res.status(200).json(products);
    });
}
// 상품 상세 조회
// 조회 필드: id, name, description, price, tags, createdAt
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: productId } = req.params;
        const userId = req.user.id;
        const product = yield product_service_1.default.get(userId, Number(productId));
        res.status(200).json(product);
    });
}
// 상품: 좋아요/좋아요-취소
function likeToggle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_service_1.default.likeToggle(req.user.id, Number(req.params.id));
        res.status(200).json(product);
    });
}
// 모든 상품의 가격 기록 조회
function getPriceRecord(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const records = yield product_service_1.default.getPriceRecord(Number(req.params.id));
        res.status(200).json(records);
    });
}
function getPriceRecords(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const records = yield product_service_1.default.getPriceRecords(Number(req.params.productId));
        res.status(200).json({ total: records.length, data: records });
    });
}
exports.default = {
    post,
    patch,
    erase,
    getList,
    get,
    likeToggle,
    getPriceRecords,
    getPriceRecord
};
