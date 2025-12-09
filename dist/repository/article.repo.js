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
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
function post(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.article.create({ data });
    });
}
function patch(id, articleData) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.article.update({
            where: { id },
            data: articleData,
            include: { comments: true, likedUsers: true }
        });
    });
}
function erase(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.article.delete({ where: { id } });
    });
}
function getList(where, orderBy, offset, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.article.findMany({
            skip: offset, // default 0
            take: limit, // default 10
            orderBy,
            where
        });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.article.findUniqueOrThrow({
            where: { id },
            include: { comments: true, likedUsers: true } // 관계형 필드도 일단 가져온다
        });
    });
}
exports.default = {
    post,
    patch,
    erase,
    findById,
    getList
};
