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
const user_service_1 = __importDefault(require("../service/user.service"));
const constants_1 = require("../lib/constants");
function getList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = (yield user_service_1.default.getList());
        res.status(200).json(users);
    });
}
function getInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_service_1.default.getInfo(req.user.id);
        res.status(200).json(user);
    });
}
function patchInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_service_1.default.patchInfo(req.user.id, req.body);
        res.status(200).json(user);
    });
}
function patchPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.user;
        const { password_now: oldPassword, password_new: newPassword } = req.body;
        const user = yield user_service_1.default.patchPassword(userId, oldPassword, newPassword);
        res.status(200).send({ message: '비밀번호가 변경되었습니다' });
    });
}
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield user_service_1.default.getProducts(req.user.id);
        res.status(200).json(products);
    });
}
function getArticles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = yield user_service_1.default.getArticles(req.user.id);
        res.status(200).json(articles);
    });
}
function getLikedProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield user_service_1.default.getLikedProducts(req.user.id);
        res.status(200).json(products);
    });
}
function getLikedArticles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = yield user_service_1.default.getLikedArticles(req.user.id);
        res.status(200).json(articles);
    });
}
//-------------------------------------------------- local functions
function setTokenCookies(res, accessToken, refreshToken) {
    // res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    //   httpOnly: true,
    //   secure: NODE_ENV === 'production', // false: 쓸데없이 우회적인 표현
    //   sameSite: 'lax',
    //   maxAge: ACCESS_TOKEN_MAXAGE || 1 * 60 * 60 * 1000 // 1 hour
    // });
    res.cookie(constants_1.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: constants_1.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: constants_1.REFRESH_TOKEN_MAXAGE || 1 * 24 * 60 * 60 * 1000, // 1 day,
        path: '/users/tokens'
    });
}
exports.default = {
    getList,
    getInfo,
    patchInfo,
    patchPassword,
    getProducts,
    getArticles,
    getLikedProducts,
    getLikedArticles
};
