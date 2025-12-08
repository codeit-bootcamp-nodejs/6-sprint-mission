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
const superstruct_1 = require("superstruct");
const structs_js_1 = require("../struct/structs.js");
const comment_repo_js_1 = __importDefault(require("../repository/comment.repo.js"));
function getList(limit, cursor, typeStr, contentStr) {
    return __awaiter(this, void 0, void 0, function* () {
        let where = {};
        if (typeStr === 'product')
            where = { articleId: null };
        if (typeStr === 'article')
            where = { productId: null };
        if (contentStr)
            where.content = { contains: contentStr };
        // nextCursor 계산에 반영해야 할 부분
        // 남은 item 수 보다 nextCurwor가 더 큰 경우 - 쉬운 문제
        // product, article 댓글이 마구 섞여 있을 때, type을 밝히는 경우 comments.id로 하면 문제가 됨 - 어려운 문제
        const comments = yield comment_repo_js_1.default.getList(where, typeStr, Number(limit), Number(cursor));
        const nextCursor = comments.length > 0 ? comments[comments.length - 1].id : null;
        return { comments, nextCursor };
    });
}
function get(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comment_repo_js_1.default.findById(Number(commentId));
        const { id, content, articleId, productId, userId, createdAt, updatedAt } = comment;
        if (comment.articleId == null)
            return { id, content, productId, userId, createdAt };
        if (comment.productId == null)
            return { id, content, articleId, userId, createdAt };
    });
}
function postProduct(content, productId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentData = {
            content,
            productId: Number(productId),
            userId: Number(userId)
        };
        (0, superstruct_1.assert)(commentData, structs_js_1.CreateComment);
        const comment = yield comment_repo_js_1.default.post(commentData);
        return comment;
    });
}
function postArticle(content, articleId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentData = {
            content,
            articleId: Number(articleId),
            userId: Number(userId)
        };
        (0, superstruct_1.assert)(commentData, structs_js_1.CreateComment);
        const comment = yield comment_repo_js_1.default.post(commentData);
        return comment;
    });
}
function patch(commentId, data, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentData = Object.assign(Object.assign({}, data), { userId });
        (0, superstruct_1.assert)(commentData, structs_js_1.PatchComment);
        return yield comment_repo_js_1.default.patch(Number(commentId), commentData);
    });
}
function erase(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield comment_repo_js_1.default.erase(Number(commentId));
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
