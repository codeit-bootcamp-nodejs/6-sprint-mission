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
        return yield prismaClient_1.default.product.create({ data });
    });
}
function patch(id, productData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.update({
            where: { id },
            data: productData,
            include: { comments: true, likedUsers: true }
        });
    });
}
function like(productId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.update({
            where: { id: productId },
            data: { likedUsers: { connect: { id: userId } } },
            include: { likedUsers: true }
        });
    });
}
function cancelLike(productId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.update({
            where: { id: productId },
            data: { likedUsers: { disconnect: { id: userId } } },
            include: { likedUsers: true }
        });
    });
}
function erase(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prismaClient_1.default.product.delete({ where: { id } });
    });
}
function countById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.count({ where: { id } });
    });
}
function getList(where, orderBy, offset, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.findMany({
            skip: offset, // offset 방식 페이지네이션: default 0
            take: limit, // default 10
            orderBy,
            where
        });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_1.default.product.findUniqueOrThrow({
            where: { id },
            include: { comments: true, likedUsers: true } // 관계형 필드도 일단 가져온다
        });
    });
}
function findImgUrls(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prismaClient_1.default.product.findUniqueOrThrow({
            where: { id },
            select: { imageUrls: true }
        });
        return result.imageUrls;
    });
}
function createPriceRecord(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.productPriceHistory.create({ data });
    });
}
function getPriceRecord(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.productPriceHistory.findUnique({ where: { id } });
    });
}
function getPriceRecords(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.productPriceHistory.findMany({
            where: { productId },
            orderBy: { createdAt: 'asc' }
        });
    });
}
exports.default = {
    post,
    patch,
    like,
    cancelLike,
    erase,
    findById,
    findImgUrls,
    countById,
    getList,
    createPriceRecord,
    getPriceRecords,
    getPriceRecord
};
