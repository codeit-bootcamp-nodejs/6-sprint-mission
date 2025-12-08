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
        const product = yield product_service_1.default.post(req.user.id, req.body);
        console.log(`Product_${product.id} posted by ${req.user.nickname}`);
        res.status(201).json(product);
    });
}
// 상품 수정: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
function patch(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const product = yield product_service_1.default.patch(id, req.body);
        console.log(`Product_${id} patched by ${req.user.nickname}`);
        res.status(200).json(product);
    });
}
// 상품 삭제: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
function erase(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield product_service_1.default.erase(id);
        console.log(`Product_${id} deleted by ${req.user.nickname}`);
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
        console.log('Product list fetched');
        res.status(200).json(products);
    });
}
// 상품 상세 조회
// 조회 필드: id, name, description, price, tags, createdAt
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { id } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const product = yield product_service_1.default.get(userId, id);
        console.log(`Product_${id} fetched (in detail)`);
        res.status(200).json(product);
    });
}
// 상품: 좋아요/좋아요-취소
function like(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_service_1.default.like(req.user, req.params.id);
        res.status(200).json(product);
    });
}
function cancelLike(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_service_1.default.cancelLike(req.user.id, req.params.id);
        res.status(200).json(product);
    });
}
exports.default = {
    post,
    patch,
    erase,
    getList,
    get,
    like,
    cancelLike
};
