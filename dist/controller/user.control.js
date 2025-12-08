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
        if (users.length > 1)
            console.log('User list fetched');
        res.status(200).json(users);
    });
}
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = (yield user_service_1.default.register(req.body));
        console.log(`User_${newUser.id} registered successfully`);
        res.status(201).json(newUser);
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessToken, refreshToken } = yield user_service_1.default.login(req, res);
        setTokenCookies(res, accessToken, refreshToken);
        console.log(`User logged-in`);
        res.status(200).send({ message: '사용자가 로그인 하였습니다' });
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        user_service_1.default.logout(res);
        console.log(`User logged-out`);
        res.status(200).send({ message: '사용자가 로그아웃 하였습니다' });
    });
}
function viewTokens(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (constants_1.NODE_ENV === 'development') {
            const { accessToken, refreshToken } = user_service_1.default.viewTokens(req.cookies);
            console.log('');
            console.log(`accessToken:  ${accessToken}`);
            console.log(`refreshToken: ${refreshToken}`);
            console.log('');
            if (!refreshToken)
                res.status(404).send({ message: '로그인 하세요' });
        }
        else {
            res.status(403).send({ message: '개발자 옵션입니다' });
        }
    });
}
function issueTokens(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessToken, refreshToken } = yield user_service_1.default.issueTokens(req.cookies);
        setTokenCookies(res, accessToken, refreshToken);
        console.log(`Tokens refreshed`);
        res.status(201).send({ accessToken });
    });
}
function getInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_service_1.default.getInfo(req.user.id);
        console.log(`User${req.user.id}: user info fetched`);
        res.status(200).json(user);
    });
}
function patchInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_service_1.default.patchInfo(req.user.id, req.body);
        console.log(`User${req.user.id}: user info edited`);
        res.status(200).json(user);
    });
}
function patchPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.user;
        const { password_now: oldPassword, password_new: newPassword } = req.body;
        const user = yield user_service_1.default.patchPassword(userId, oldPassword, newPassword);
        console.log(`User${req.user.id}: user password changed`);
        res.status(200).send({ message: '패스워드가 변경되었습니다' });
    });
}
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield user_service_1.default.getProducts(req.user.id);
        console.log(`User${req.user.id}: user products fetched`);
        res.status(200).json(products);
    });
}
function getArticles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = yield user_service_1.default.getArticles(req.user.id);
        console.log(`User${req.user.id}: user articles fetched`);
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
    res.cookie(constants_1.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: constants_1.NODE_ENV === 'production', // false: 쓸데없이 우회적인 표현
        maxAge: constants_1.ACCESS_TOKEN_MAXAGE || 1 * 60 * 60 * 1000 // 1 hour
    });
    res.cookie(constants_1.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: constants_1.NODE_ENV === 'production',
        maxAge: constants_1.REFRESH_TOKEN_MAXAGE || 1 * 24 * 60 * 60 * 1000, // 1 day,
        path: '/users/tokens'
    });
}
exports.default = {
    getList,
    register,
    login,
    logout,
    viewTokens,
    issueTokens,
    getInfo,
    patchInfo,
    patchPassword,
    getProducts,
    getArticles,
    getLikedProducts,
    getLikedArticles
};
