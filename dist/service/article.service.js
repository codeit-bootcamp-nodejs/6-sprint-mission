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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superstruct_1 = require("superstruct");
const article_struct_1 = require("../struct/article.struct");
const article_repo_1 = __importDefault(require("../repository/article.repo"));
const myFuns_1 = require("../lib/myFuns");
const selectFields_1 = require("../lib/selectFields");
const NotFoundError_1 = __importDefault(require("../middleware/errors/NotFoundError"));
// 게시물 생성, 수정, 삭제: 토큰 인증된 유저만 가능
function post(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleData = Object.assign(Object.assign({}, data), { userId });
        (0, superstruct_1.assert)(articleData, article_struct_1.CreateArticle);
        const article = yield article_repo_1.default.post(articleData);
        return article;
    });
}
function patch(articleId, articleData) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(articleData, article_struct_1.PatchArticle);
        const article = yield article_repo_1.default.patch(Number(articleId), articleData);
        if ((0, myFuns_1.isEmpty)(article))
            throw new NotFoundError_1.default();
        return article;
    });
}
function erase(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield article_repo_1.default.erase(Number(articleId));
    });
}
// 게시물 목록 조회
// 페이지네이션: offset 기반
// 퀘리 순서: order로 createdAt 오름/내림 순서 조회
// 퀘리 조건: title이나 content에 포함된 문자로 검색 조회
function getList(offset, limit, orderStr, titleStr, contentStr) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderBy = { createdAt: 'desc' };
        if (orderStr === 'oldest') {
            orderBy.createdAt = 'asc';
        }
        else
            orderBy.createdAt = 'desc';
        const where = { title: { contains: '' }, content: { contains: '' } };
        if (titleStr)
            where.title = { contains: titleStr };
        if (contentStr)
            where.content = { contains: contentStr };
        const articles = yield article_repo_1.default.getList(where, orderBy, offset, limit);
        const articlesToShow = articles.map((a) => {
            // 보여줄 필드 선택
            const { id, title, content, createdAt } = a, rest = __rest(a, ["id", "title", "content", "createdAt"]);
            return { id, title, content, createdAt };
        });
        return articlesToShow;
    });
}
// 게시물 상세 조회
// 조회 필드 요구: id, title, content, createdAt
// 조회 필드 추가: comments, likedUsers
function get(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        let article = yield article_repo_1.default.findById(Number(articleId));
        const article2show = (0, selectFields_1.selectFields)(article);
        if (!userId)
            return article2show;
        const isLiked = article.likedUsers.some((a) => a.id === userId);
        return Object.assign({ isLiked }, article2show);
    });
}
// 좋아요와 좋아요취소 토글
function likeToggle(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield article_repo_1.default.findById(Number(articleId));
        const isLiked = (0, myFuns_1.includedOk)(article.likedUsers, 'id', userId);
        const updated = isLiked
            ? yield article_repo_1.default.cancelLike(Number(articleId), userId)
            : yield article_repo_1.default.like(Number(articleId), userId);
        console.log(isLiked ? 'Now, not your favorite article' : 'Now, your favorite article');
        const article2show = (0, selectFields_1.selectFields)(updated);
        return Object.assign({ isLiked: !isLiked }, article2show);
    });
}
exports.default = {
    post,
    patch,
    erase,
    getList,
    get,
    likeToggle
};
