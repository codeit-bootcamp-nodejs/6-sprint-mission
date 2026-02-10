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
const notification_service_1 = __importDefault(require("../service/notification.service"));
function getList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type } = req.query;
        const typeStr = typeof type === 'string' ? type : 'all';
        const notifications = yield notification_service_1.default.getList(req.user.id, typeStr);
        res.status(200).send({ total: notifications.length, data: notifications });
    });
}
function countUnread(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const unreadCount = yield notification_service_1.default.countUnread(req.user.id);
        res.status(200).json({ unreadCount });
    });
}
function patch(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const notification = yield notification_service_1.default.patch(Number(req.params.id));
        res.status(200).json(notification);
    });
}
exports.default = {
    getList,
    countUnread,
    patch
};
