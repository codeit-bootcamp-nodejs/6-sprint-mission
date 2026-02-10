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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPassword = filterPassword;
exports.hashingPassword = hashingPassword;
exports.check_passwordValidity = check_passwordValidity;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repo_1 = __importDefault(require("../repository/user.repo"));
const constants_1 = require("../lib/constants");
const token_1 = require("../lib/token");
const superstruct_1 = require("superstruct");
const user_struct_1 = require("../struct/user.struct");
const socketIO_1 = require("../websocket/socketIO");
const ConflictError_1 = __importDefault(require("../middleware/errors/ConflictError"));
const ForbiddenError_1 = __importDefault(require("../middleware/errors/ForbiddenError"));
const NotFoundError_1 = __importDefault(require("../middleware/errors/NotFoundError"));
function register(data) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(data, user_struct_1.CreateUser);
        const { email, nickname, password } = data;
        const user = yield user_repo_1.default.findByEmail(email);
        if (user) {
            console.log('User registered already');
            throw new ConflictError_1.default('이미 등록된 이메일입니다');
        }
        const newData = {
            email,
            nickname,
            password: yield hashingPassword(password)
        };
        const newUser = yield user_repo_1.default.create(newData);
        return filterPassword(newUser);
    });
}
function login(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_1.default.findByEmail(data.email);
        if (!user)
            throw new NotFoundError_1.default();
        const isPasswordOk = yield check_passwordValidity(data.password, user.password);
        if (!isPasswordOk) {
            console.log('Invalid password');
            throw new ForbiddenError_1.default('비밀번호가 틀렸습니다');
        }
        if (user.notifications.length) {
            const unreadCount = user.notifications.filter((n) => n.isRead === false).length;
            console.log(`You have ${unreadCount} unread notifications`);
        }
        const { accessToken, refreshToken } = (0, token_1.generateTokens)(user.id);
        return { accessToken, refreshToken };
    });
}
function logout(userId, tokenData) {
    tokenData.clearCookie(constants_1.REFRESH_TOKEN_COOKIE_NAME, { path: '/users/tokens' });
    const io = (0, socketIO_1.getIO)();
    for (const s of io.of('/').sockets.values()) {
        if (s.data.userId === userId) {
            s.disconnect(true);
        }
    }
}
function issueTokens(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = (0, token_1.verifyRefreshToken)(refreshToken);
        const user = yield verifyUserExist(userId);
        return (0, token_1.generateTokens)(user.id);
    });
}
//------------------------------------ local functions
function filterPassword(userData) {
    if (Array.isArray(userData)) {
        return userData.map((user) => {
            const { password: _ } = user, rest = __rest(user, ["password"]);
            return rest;
        });
    }
    else {
        const { password: _ } = userData, rest = __rest(userData, ["password"]);
        return rest;
    }
}
function hashingPassword(textPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        return yield bcrypt_1.default.hash(textPassword, salt);
    });
}
function check_passwordValidity(textPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isPasswordSame = yield bcrypt_1.default.compare(textPassword, savedPassword);
        return isPasswordSame;
    });
}
//function clearTokenCookies(tokenData: Response): void {
//tokenData.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
//tokenData.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: '/users/tokens' });
// refreshToken은 지정된 path가 있음
//}
// function check_refreshTokenValidity(tokenData: Record<string, string | undefined>): string {
//   const refreshToken = tokenData[REFRESH_TOKEN_COOKIE_NAME];
//   if (!refreshToken) {
//     console.log('Tokens expired');
//     throw new UnauthorizedError('토큰이 만료되었습니다');
//   }
//   return refreshToken;
// }
function verifyUserExist(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_1.default.findById(userId);
        if (!user) {
            console.log('No user found. Resgister again.');
            throw new NotFoundError_1.default('등록되지 않은 사용자입니다');
        }
        return user;
    });
}
exports.default = {
    register,
    login,
    logout,
    issueTokens,
    verifyUserExist,
    filterPassword,
    hashingPassword,
    check_passwordValidity
};
