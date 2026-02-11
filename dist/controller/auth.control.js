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
const user_struct_1 = require("../struct/user.struct");
const constants_1 = require("../lib/constants");
const auth_service_1 = __importDefault(require("../service/auth.service"));
const UnauthorizedError_1 = __importDefault(require("../middleware/errors/UnauthorizedError"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(req.body, user_struct_1.CreateUser);
        const newUser = yield auth_service_1.default.register(req.body);
        res.status(201).json(newUser);
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessToken, refreshToken } = yield auth_service_1.default.login(req.body);
        setTokenCookies(res, refreshToken);
        res.status(200).json({ accessToken });
    });
}
function logout(req, res) {
    auth_service_1.default.logout(req.user.id, res);
    res.status(200).send({ message: '사용자가 로그아웃 하였습니다' });
}
function viewTokens(req, res) {
    const auth = req.headers.authorization;
    if (!(auth === null || auth === void 0 ? void 0 : auth.startsWith('Bearer ')))
        throw new UnauthorizedError_1.default();
    const accessToken = auth.slice(7);
    const refreshToken = req.cookies[constants_1.REFRESH_TOKEN_COOKIE_NAME];
    console.log('');
    console.log(`accessToken:  ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);
    console.log('');
    //if (!refreshToken) res.status(404).send({ message: '로그인 하세요' });
}
function issueTokens(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(req.cookies[REFRESH_TOKEN_COOKIE_NAME]);
        const { accessToken, refreshToken } = yield auth_service_1.default.issueTokens(req.cookies[constants_1.REFRESH_TOKEN_COOKIE_NAME]);
        setTokenCookies(res, refreshToken);
        res.status(201).send({ accessToken });
    });
}
//-------------------------------------------------- local functions
function setTokenCookies(res, 
//accessToken: string | undefined,
refreshToken) {
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
        path: '/auth/tokens'
    });
}
exports.default = {
    register,
    login,
    logout,
    viewTokens,
    issueTokens
};
