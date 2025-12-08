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
const bcrypt_1 = __importDefault(require("bcrypt"));
const BadRequestError_js_1 = __importDefault(require("../middleware/errors/BadRequestError.js"));
const user_repo_js_1 = __importDefault(require("../repository/user.repo.js"));
const constants_js_1 = require("../lib/constants.js");
const token_js_1 = require("../lib/token.js");
const NotFoundError_js_1 = __importDefault(require("../middleware/errors/NotFoundError.js"));
const superstruct_1 = require("superstruct");
const structs_js_1 = require("../struct/structs.js");
const structs_js_2 = require("../struct/structs.js");
const myFuns_js_1 = require("../lib/myFuns.js");
const selectFields_js_1 = require("../lib/selectFields.js");
function getList() {
    return __awaiter(this, void 0, void 0, function* () {
        if (constants_js_1.NODE_ENV === 'development') {
            const users = yield user_repo_js_1.default.getList();
            if (!users)
                throw new Error('NOT_FOUND');
            return users;
        }
        else {
            return { message: '개발자 옵션 입니다' };
        }
    });
}
function register(data) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(data, structs_js_1.CreateUser);
        const { email, nickname, password } = data;
        const { isNew } = yield check_userRegistration(email);
        if (!isNew) {
            console.log('User registered already');
            throw new BadRequestError_js_1.default('USER_FOUND');
        }
        const newData = {
            email,
            nickname,
            password: yield hashingPassword(password)
        };
        const newUser = yield user_repo_js_1.default.create(newData);
        return filterPassword(newUser);
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { isNew, user } = yield check_userRegistration(email);
        if (isNew || !user)
            throw new BadRequestError_js_1.default('NO_USER_FOUND');
        if (!check_passwordValidity(password, user.password)) {
            console.log('Invalid password');
            throw new BadRequestError_js_1.default('FORBIDDEN');
        }
        const { accessToken, refreshToken } = (0, token_js_1.generateTokens)(user.id);
        return { accessToken, refreshToken };
    });
}
function logout(tokenData) {
    clearTokenCookies(tokenData);
}
function issueTokens(tokenData) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = check_refreshTokenValidity(tokenData);
        const { userId } = (0, token_js_1.verifyRefreshToken)(refreshToken);
        const user = yield verifyUserExist(userId);
        return (0, token_js_1.generateTokens)(user.id);
    });
}
function viewTokens(tokenData) {
    const accessToken = tokenData[constants_js_1.ACCESS_TOKEN_COOKIE_NAME];
    const refreshToken = tokenData[constants_js_1.REFRESH_TOKEN_COOKIE_NAME];
    return { accessToken, refreshToken };
}
function getInfo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_js_1.default.findById(userId);
        return (0, selectFields_js_1.selectUserFields)(user, 'all');
    });
}
function patchInfo(userId, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(userData, structs_js_2.PatchUser);
        const user = (yield user_repo_js_1.default.patch(userId, userData));
        return (0, selectFields_js_1.selectUserFields)(user, 'core');
    });
}
function patchPassword(userId, oldPassword, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_js_1.default.findById(userId);
        if (!(yield check_passwordValidity(oldPassword, user.password))) {
            (0, myFuns_js_1.print)('Invalid current password');
            throw new BadRequestError_js_1.default('FORBIDDEN');
        }
        // 현재 패스워드 입력을 요구하므로 비교는 불필요하지만 넣어 보았음
        if (yield check_passwordValidity(newPassword, user.password)) {
            (0, myFuns_js_1.print)('Invalid new password: same');
            throw new BadRequestError_js_1.default('NOTHING_TO_CHANGE');
        }
        const userData = { password: yield hashingPassword(newPassword) };
        (0, superstruct_1.assert)(userData, structs_js_2.PatchUser);
        const newUser = yield user_repo_js_1.default.patch(Number(userId), userData);
        return (0, selectFields_js_1.selectUserFields)(newUser, 'core');
    });
}
function getProducts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_js_1.default.findById(userId);
        const selectedInfo = (0, selectFields_js_1.selectUserFields)(user, 'myProducts');
        if ((0, myFuns_js_1.isEmpty)(selectedInfo)) {
            (0, myFuns_js_1.print)(`No products registered by user_${userId}`);
            throw new NotFoundError_js_1.default('User', userId);
        }
        return selectedInfo;
    });
}
function getArticles(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_js_1.default.findById(userId);
        const selectedInfo = (0, selectFields_js_1.selectUserFields)(user, 'myArticles');
        if ((0, myFuns_js_1.isEmpty)(selectedInfo)) {
            (0, myFuns_js_1.print)(`No articles registered by user_${userId}`);
            throw new NotFoundError_js_1.default('User', userId);
        }
        return selectedInfo;
    });
}
function getLikedProducts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_js_1.default.findById(userId);
        if ((0, myFuns_js_1.isEmpty)(user.likedProducts)) {
            (0, myFuns_js_1.print)(`No products liked by user_${userId}`);
            throw new NotFoundError_js_1.default('User', userId);
        }
        return (0, selectFields_js_1.selectUserFields)(user, 'likedProducts');
    });
}
function getLikedArticles(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_js_1.default.findById(userId);
        if ((0, myFuns_js_1.isEmpty)(user.likedArticles)) {
            (0, myFuns_js_1.print)(`No articles liked by user_${userId}`);
            throw new NotFoundError_js_1.default('User', userId);
        }
        return (0, selectFields_js_1.selectUserFields)(user, 'likedArticles');
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
function check_userRegistration(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_js_1.default.findByEmail(email);
        if ((0, myFuns_js_1.isEmpty)(user))
            return { isNew: true, user: null };
        else {
            return { isNew: false, user };
        }
    });
}
function check_passwordValidity(textPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isPasswordSame = yield bcrypt_1.default.compare(textPassword, savedPassword);
        return isPasswordSame;
    });
}
function clearTokenCookies(tokenData) {
    tokenData.clearCookie(constants_js_1.ACCESS_TOKEN_COOKIE_NAME);
    tokenData.clearCookie(constants_js_1.REFRESH_TOKEN_COOKIE_NAME, { path: '/users/tokens' });
    // refreshToken은 지정된 path가 있음
}
function check_refreshTokenValidity(tokenData) {
    const refreshToken = tokenData[constants_js_1.REFRESH_TOKEN_COOKIE_NAME];
    if (!refreshToken) {
        console.log('Tokens expired');
        throw new BadRequestError_js_1.default('EXPIRED_TOKENS');
    }
    return refreshToken;
}
function verifyUserExist(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_js_1.default.findById(userId);
        if (!user) {
            console.log('No user found. Resgister again.');
            throw new NotFoundError_js_1.default(user, userId);
        }
        return user;
    });
}
exports.default = {
    getList,
    register,
    login,
    logout,
    issueTokens,
    viewTokens,
    getInfo,
    patchInfo,
    patchPassword,
    getProducts,
    getArticles,
    verifyUserExist,
    filterPassword,
    getLikedProducts,
    getLikedArticles
};
