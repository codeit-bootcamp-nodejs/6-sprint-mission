"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_control_1 = __importDefault(require("../controller/user.control"));
const withTryCatch_1 = __importDefault(require("../lib/withTryCatch"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const constants_1 = require("../lib/constants");
const validateReqBody_1 = require("../middleware/validateReqBody");
const userRouter = express_1.default.Router();
userRouter.get('/', (0, authenticate_1.default)({ optional: true }), (0, withTryCatch_1.default)(user_control_1.default.getList)); // 부가기능
// 인증된 유저 APIs (비번은 res로 보여주지 않음)
userRouter.get('/info', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(user_control_1.default.getInfo)); // 자신의 정보 조회
userRouter.patch('/info/edit', (0, authenticate_1.default)(), (0, validateReqBody_1.validateReqBody)(constants_1.allowedUserKeys), (0, withTryCatch_1.default)(user_control_1.default.patchInfo)); // 토큰 인증 정보 수정, 비번 제외
userRouter.patch('/info/password/change', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(user_control_1.default.patchPassword));
userRouter.get('/products', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(user_control_1.default.getProducts)); // 자신이 등록한 상품 목록 조회
userRouter.get('/articles', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(user_control_1.default.getArticles)); // 자신이 등록한 게시물 목록 조회: 부가 기능
userRouter.get('/like/products', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(user_control_1.default.getLikedProducts)); // 자신이 좋아요 누른 상품 조회
userRouter.get('/like/articles', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(user_control_1.default.getLikedArticles)); // 자신이 좋아요 누른 게시물 조회: 부가 기능
//userRouter.post('/myInfo/delete', deleteUser); // 부가 기능
exports.default = userRouter;
