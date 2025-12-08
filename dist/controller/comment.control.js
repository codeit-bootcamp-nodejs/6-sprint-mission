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
const comment_service_js_1 = __importDefault(require("../service/comment.service.js"));
// 모든 댓글 목록 조회
// 페이지네이션: cursor 기반 (default: limit=10)
// 조회순: id 오름순으로 고정
// 조건 검색: content에 포함된 단어
function getList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        const cursor = parseInt(req.query.cursor, 10);
        const type = req.query.type || 'all';
        const content = req.query.content;
        console.log(`Fetching ${type} comment list...`);
        console.log(`cursor, now:   ${cursor}`);
        const { comments, nextCursor } = yield comment_service_js_1.default.getList(limit, cursor, type, content);
        console.log(`cursor, next:  ${nextCursor}`);
        console.log('');
        res.status(200).json(comments);
    });
}
// 1개 댓글 조회
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comment_service_js_1.default.get(req.params.id);
        console.log('Comments fetched');
        res.status(200).json(comment);
    });
}
// 상품 댓글 등록
// req.params에 commentId 있어야 함
// 입력 필드: content
// req.params에 productId 있어야 함
function postProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content } = req.body;
        const { id: productId } = req.params;
        const { id: userId } = req.user;
        const comment = yield comment_service_js_1.default.postProduct(content, productId, userId);
        console.log('Comment created');
        res.status(200).json(comment);
    });
}
// 게시물 댓글 등록
// req.params에 commentId 있어야 함
// 입력 필드: content
// req.params에 articleId 있어야 함
function postArticle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content } = req.body;
        const { id: articleId } = req.params;
        const { id: userId } = req.user;
        const comment = yield comment_service_js_1.default.postArticle(content, articleId, userId);
        console.log('Comment created');
        res.status(200).json(comment);
    });
}
// 1개 댓글 수정
// req.params에 commentId 있어야 함
// 입력 필드: content
function patch(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comment_service_js_1.default.patch(req.params.id, req.body, req.user.id);
        console.log('Comments edited.');
        res.status(201).json(comment);
    });
}
// 1개 댓글 삭제
// req.params에 commentId 있어야 함
function erase(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield comment_service_js_1.default.erase(req.params.id);
        console.log('Comment deleted.');
        res.status(204).send('Comment deleted.');
    });
}
exports.default = {
    getList,
    get,
    postProduct,
    postArticle,
    patch,
    erase
};
