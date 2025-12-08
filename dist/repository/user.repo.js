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
function getList() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_js_1.default.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: { id: true, email: true, nickname: true, createdAt: true }
        });
    });
}
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_js_1.default.user.create({ data });
    });
}
function findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_js_1.default.user.findUnique({ where: { email } });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prismaClient_js_1.default.user.findUniqueOrThrow({
            where: { id },
            include: {
                products: true,
                articles: true,
                comments: true,
                likedProducts: true,
                likedArticles: true
            }
        });
    });
}
function patch(id, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_js_1.default.user.update({
            where: { id },
            data: userData
        });
    });
}
function getProducts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_js_1.default.product.findMany({
            where: { userId }
        });
    });
}
function getArticles(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_js_1.default.article.findMany({
            where: { userId }
        });
    });
}
exports.default = {
    getList,
    create,
    patch,
    findByEmail,
    findById,
    getProducts,
    getArticles
};
