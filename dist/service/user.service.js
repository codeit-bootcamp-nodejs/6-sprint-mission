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
const user_repo_1 = __importDefault(require("../repository/user.repo"));
const constants_1 = require("../lib/constants");
const superstruct_1 = require("superstruct");
const user_struct_1 = require("../struct/user.struct");
const myFuns_1 = require("../lib/myFuns");
const selectFields_1 = require("../lib/selectFields");
const auth_service_1 = require("./auth.service");
const BadRequestError_1 = __importDefault(require("../middleware/errors/BadRequestError"));
const NotFoundError_1 = __importDefault(require("../middleware/errors/NotFoundError"));
const ForbiddenError_1 = __importDefault(require("../middleware/errors/ForbiddenError"));
function getList() {
    return __awaiter(this, void 0, void 0, function* () {
        if (constants_1.NODE_ENV === 'development') {
            const users = yield user_repo_1.default.getList();
            if (!users)
                throw new NotFoundError_1.default();
            return (0, auth_service_1.filterPassword)(users);
        }
        else {
            return { message: '개발자 옵션 입니다' };
        }
    });
}
function getInfo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_1.default.findById(userId);
        return (0, selectFields_1.selectUserFields)(user, 'all');
    });
}
function patchInfo(userId, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(userData, user_struct_1.PatchUser);
        const user = yield user_repo_1.default.patch(userId, userData);
        return (0, selectFields_1.selectUserFields)(user, 'core');
    });
}
function patchPassword(userId, oldPassword, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_1.default.findById(userId);
        if (!(yield (0, auth_service_1.check_passwordValidity)(oldPassword, user.password))) {
            (0, myFuns_1.print)('Invalid current password');
            throw new ForbiddenError_1.default('비밀번호가 틀렸습니다');
        }
        // 현재 패스워드 입력을 요구하므로 비교는 불필요하지만 넣어 보았음
        if (yield (0, auth_service_1.check_passwordValidity)(newPassword, user.password)) {
            (0, myFuns_1.print)('Invalid new password: same');
            throw new BadRequestError_1.default('비밀번호가 같습니다');
        }
        const userData = { password: yield (0, auth_service_1.hashingPassword)(newPassword) };
        (0, superstruct_1.assert)(userData, user_struct_1.PatchUser);
        const newUser = yield user_repo_1.default.patch(Number(userId), userData);
        return (0, selectFields_1.selectUserFields)(newUser, 'core');
    });
}
function getProducts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_1.default.findById(userId);
        const selectedInfo = (0, selectFields_1.selectUserFields)(user, 'myProducts');
        if ((0, myFuns_1.isEmpty)(selectedInfo)) {
            (0, myFuns_1.print)(`No products registered by user_${userId}`);
            throw new NotFoundError_1.default();
        }
        return selectedInfo;
    });
}
function getArticles(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_1.default.findById(userId);
        const selectedInfo = (0, selectFields_1.selectUserFields)(user, 'myArticles');
        // console.log(selectedInfo);
        // console.log(isEmpty(selectedInfo));
        if ((0, myFuns_1.isEmpty)(selectedInfo)) {
            (0, myFuns_1.print)(`No articles registered by user_${userId}`);
            throw new NotFoundError_1.default();
        }
        return selectedInfo;
    });
}
function getLikedProducts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_1.default.findById(userId);
        if ((0, myFuns_1.isEmpty)(user.likedProducts)) {
            (0, myFuns_1.print)(`No products liked by user_${userId}`);
            throw new NotFoundError_1.default();
        }
        return (0, selectFields_1.selectUserFields)(user, 'likedProducts');
    });
}
function getLikedArticles(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_1.default.findById(userId);
        if ((0, myFuns_1.isEmpty)(user.likedArticles)) {
            (0, myFuns_1.print)(`No articles liked by user_${userId}`);
            throw new NotFoundError_1.default();
        }
        return (0, selectFields_1.selectUserFields)(user, 'likedArticles');
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
