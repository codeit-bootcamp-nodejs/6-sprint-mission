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
const structs_js_1 = require("../struct/structs.js");
const NotFoundError_js_1 = __importDefault(require("../middleware/errors/NotFoundError.js"));
const article_repo_js_1 = __importDefault(require("../repository/article.repo.js"));
const myFuns_js_1 = require("../lib/myFuns.js");
const selectFields_js_1 = require("../lib/selectFields.js");
// 게시물 생성, 수정, 삭제: 토큰 인증된 유저만 가능
function post(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleData = Object.assign(Object.assign({}, data), { userId });
        (0, superstruct_1.assert)(articleData, structs_js_1.CreateArticle);
        const prismaData = Object.assign(Object.assign({}, data), { user: { connect: { id: userId } } // userId → user 연결
         });
        const article = yield article_repo_js_1.default.post(prismaData);
        //if (isEmpty(article)) throw new NotFoundError(article, article.id);
        return article;
    });
}
function patch(articleId, articleData) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(articleData, structs_js_1.PatchArticle);
        const article = yield article_repo_js_1.default.patch(Number(articleId), articleData);
        if ((0, myFuns_js_1.isEmpty)(article))
            throw new NotFoundError_js_1.default('article', Number(articleId));
        return article;
    });
}
function erase(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield article_repo_js_1.default.erase(Number(articleId));
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
        const articles = yield article_repo_js_1.default.getList(where, orderBy, offset, limit);
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
        let article = yield article_repo_js_1.default.findById(Number(articleId));
        const article2show = (0, selectFields_js_1.selectArticleFields)(article);
        if (!userId)
            return article2show;
        const isLiked = article.likedUsers.some((a) => a.id === userId);
        return Object.assign({ isLiked }, article2show);
    });
}
function like(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        let article = yield article_repo_js_1.default.findById(Number(articleId));
        if (article.likedUsers.some((n) => n.id === userId)) {
            console.log('Already your favorite article');
        }
        else {
            console.log('Now, one of your favorite articles');
            article = yield article_repo_js_1.default.patch(Number(articleId), {
                likedUsers: { connect: { id: userId } }
            });
        }
        const article2show = (0, selectFields_js_1.selectArticleFields)(article);
        return Object.assign({ isLiked: true }, article2show);
    });
}
function cancelLike(userId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        let article = yield article_repo_js_1.default.findById(Number(articleId));
        if (!article.likedUsers.some((n) => n.id === userId)) {
            console.log('Already not your favorite article');
        }
        else {
            console.log('Now, not one of your favorite articles');
            article = yield article_repo_js_1.default.patch(Number(articleId), {
                likedUsers: { disconnect: { id: userId } }
            });
        }
        const article2show = (0, selectFields_js_1.selectArticleFields)(article);
        return Object.assign({ isLiked: false }, article2show);
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
