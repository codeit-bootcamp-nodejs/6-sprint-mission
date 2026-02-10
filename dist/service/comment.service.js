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
const comment_struct_1 = require("../struct/comment.struct");
const product_struct_1 = require("../struct/product.struct");
const comment_repo_1 = __importDefault(require("../repository/comment.repo"));
const notification_repo_1 = __importDefault(require("../repository/notification.repo"));
const client_1 = require("@prisma/client");
const article_repo_1 = __importDefault(require("../repository/article.repo"));
const NotFoundError_1 = __importDefault(require("../middleware/errors/NotFoundError"));
const socketIO_1 = require("../websocket/socketIO");
const myFuns_1 = require("../lib/myFuns");
function getList(limit, cursor, typeStr, contentStr) {
    return __awaiter(this, void 0, void 0, function* () {
        let where = {};
        if (contentStr)
            where = { content: { contains: contentStr } };
        if (typeStr == 'product')
            where = Object.assign(Object.assign({}, where), { articleId: null });
        if (typeStr == 'article')
            where = Object.assign(Object.assign({}, where), { productId: null });
        // nextCursor 계산에 반영해야 할 부분
        // 남은 item 수 보다 nextCurwor가 더 큰 경우 - 쉬운 문제
        // product, article 댓글이 마구 섞여 있을 때, type을 밝히는 경우 comments.id로 하면 문제가 됨 - 어려운 문제
        const comments = yield comment_repo_1.default.getList(where, limit, cursor);
        const newComments = (0, myFuns_1.stripNulls)(comments);
        const nextCursor = comments.length > 0 ? comments[comments.length - 1].id : null;
        return { comments: newComments, nextCursor };
    });
}
function get(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comment_repo_1.default.findById(Number(commentId));
        const { id, content, articleId, productId, userId, createdAt, updatedAt } = comment;
        if (comment.articleId == null)
            return { id, content, productId, userId, createdAt };
        else
            return { id, content, articleId, userId, createdAt };
    });
}
function postArticle(content, id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentData = {
            content,
            userId,
            articleId: id,
            productId: null
        };
        (0, superstruct_1.assert)(commentData, comment_struct_1.CreateComment);
        const commentDataToRepo = {
            content,
            user: { connect: { id: userId } },
            article: { connect: { id } }
        };
        const comment = yield comment_repo_1.default.post(commentDataToRepo);
        console.log('');
        console.log('Comment created for article');
        const article = yield article_repo_1.default.findById(id);
        if (!article)
            throw new NotFoundError_1.default();
        //if (article.userId !== userId) { //테스트 위해 본인이 댓글 달아도 알림 보내기
        const message = `댓글 알림: ${content} (게시글${id} by 사용자${userId})`;
        const notificationData = {
            userId: article.userId,
            type: client_1.NotificationType.ARTICLE,
            message,
            articleId: id,
            productId: null
        };
        (0, superstruct_1.assert)(notificationData, product_struct_1.CreateNotification);
        const notificationDataToRepo = {
            user: { connect: { id: article.userId } },
            type: client_1.NotificationType.ARTICLE,
            message: notificationData.message,
            article: { connect: { id } }
        };
        const notification = yield notification_repo_1.default.post(notificationDataToRepo);
        const io = (0, socketIO_1.getIO)();
        io.to(`user:${article.userId}`).emit('notification', { message });
        console.log('Notification sent & stored for article author');
        // }
        return comment;
    });
}
function postProduct(content, id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentData = {
            content,
            userId,
            productId: id,
            articleId: null
        };
        (0, superstruct_1.assert)(commentData, comment_struct_1.CreateComment);
        const commentDataToRepo = {
            content,
            user: { connect: { id: userId } },
            product: { connect: { id } }
        };
        const comment = yield comment_repo_1.default.post(commentDataToRepo);
        return comment;
    });
}
function patch(commentId, data, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentData = Object.assign(Object.assign({}, data), { userId });
        (0, superstruct_1.assert)(commentData, comment_struct_1.PatchComment);
        return yield comment_repo_1.default.patch(Number(commentId), commentData);
    });
}
function erase(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield comment_repo_1.default.erase(Number(commentId));
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
