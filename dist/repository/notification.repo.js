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
function findById(id, type) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.notification.findUnique({ where: { id } });
    });
}
function findMany(userId, type) {
    return __awaiter(this, void 0, void 0, function* () {
        let notifications;
        if (type === 'unread')
            notifications = yield prismaClient_1.default.notification.findMany({
                where: { userId, isRead: false },
                orderBy: { createdAt: 'desc' }
            });
        else if (type === 'read')
            notifications = yield prismaClient_1.default.notification.findMany({
                where: { userId, isRead: true },
                orderBy: { createdAt: 'desc' }
            });
        else
            notifications = yield prismaClient_1.default.notification.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' }
            });
        return notifications;
    });
}
function countUnread(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.notification.count({ where: { userId, isRead: false } });
    });
}
function patch(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.notification.update({
            where: { id },
            data: { isRead: true, readAt: new Date() }
        });
    });
}
function post(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return prismaClient_1.default.notification.create({ data });
    });
}
exports.default = {
    findById,
    findMany,
    countUnread,
    patch,
    post
};
