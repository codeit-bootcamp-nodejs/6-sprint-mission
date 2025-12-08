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
const article_service_js_1 = __importDefault(require("../service/article.service.js"));
// 게시물 등록, 수정, 삭제: 토큰 인증된 유저만 가능
function post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield article_service_js_1.default.post(req.user.id, req.body);
        console.log(`Article_${article.id} posted successfully by user${req.user.id}`);
        res.status(201).json(article);
    });
}
// 게시물 수정
function patch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield article_service_js_1.default.patch(req.params.id, req.body);
        console.log(`Article_${req.params.id} edited by user${req.user.id}`);
        res.status(200).json(article);
    });
}
// 게시물 삭제
function erase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield article_service_js_1.default.erase(req.params.id);
        console.log(`Article_${req.params.id} deleted by user${req.user.id}`);
        res.status(204).send({ message: '게시물이 삭제되었습니다' });
    });
}
// 게시물 목록 조회와 상세 조회: 누구나 가능
function getList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { offset, limit, order, title, content } = req.query;
        const articles = yield article_service_js_1.default.getList(offset, limit, order, title, content);
        console.log('Article list fetched');
        res.status(200).json(articles);
    });
}
// 게시물 상세 조회
function get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield article_service_js_1.default.get(req.user, req.params.id);
        console.log('Article fetched (in detail)');
        res.status(200).json(article);
    });
}
// 게시물: 좋아요/좋아요-취소
function like(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield article_service_js_1.default.like(req.user.id, req.params.id);
        res.status(200).json(article);
    });
}
function cancelLike(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield article_service_js_1.default.cancelLike(req.user.id, req.params.id);
        res.status(200).json(article);
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
