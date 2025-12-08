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
const prismaClient_js_1 = __importDefault(require("../lib/prismaClient.js"));
function getList(where, type, limit, cursor) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_js_1.default.comment.findMany({
            skip: cursor ? 1 : 0, // 첫 검색 0, 이후 1
            take: limit, // default 10
            cursor: cursor ? { id: cursor } : undefined, // 첫 검색 undefined, 이후 전 검색의 최종 id
            where, // type과 content에 포함된 단어로 조건 검색
            orderBy: { id: 'asc' }, // 조회순: id 오름순으로 고정
            select: {
                id: true,
                content: true,
                productId: type == 'article' ? false : true,
                articleId: type == 'product' ? false : true,
                createdAt: true,
                updatedAt: false
            }
        });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_js_1.default.comment.findUniqueOrThrow({
            where: { id }
        });
    });
}
function post(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_js_1.default.comment.create({ data });
    });
}
function patch(id, commentData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_js_1.default.comment.update({
            where: { id },
            data: commentData
        });
    });
}
function erase(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_js_1.default.comment.delete({ where: { id } });
    });
}
exports.default = {
    getList,
    findById,
    post,
    patch,
    erase
};
