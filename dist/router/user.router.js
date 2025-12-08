"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_control_1 = __importDefault(require("../controller/user.control"));
const withTryCatch_1 = __importDefault(require("../lib/withTryCatch"));
const authenticate_user_1 = __importDefault(require("../middleware/authenticate.user"));
const userRouter = express_1.default.Router();
userRouter.get('/', (0, withTryCatch_1.default)(user_control_1.default.getList)); // 부가기능
userRouter.post('/register', (0, withTryCatch_1.default)(user_control_1.default.register));
userRouter.post('/login', (0, withTryCatch_1.default)(user_control_1.default.login));
userRouter.post('/logout', (0, withTryCatch_1.default)(user_control_1.default.logout)); // 부가 기능
// 토큰 발생
userRouter.get('/tokens/view', (0, withTryCatch_1.default)(user_control_1.default.viewTokens));
userRouter.post('/tokens/refresh', (0, withTryCatch_1.default)(user_control_1.default.issueTokens));
// 토큰 인증 (비번은 res로 보여주지 않음)
userRouter.get('/info', authenticate_user_1.default, (0, withTryCatch_1.default)(user_control_1.default.getInfo)); // 자신의 정보 조회
userRouter.patch('/info/edit', authenticate_user_1.default, (0, withTryCatch_1.default)(user_control_1.default.patchInfo)); // 토큰 인증 정보 수정, 비번 제외
userRouter.patch('/info/password/change', authenticate_user_1.default, (0, withTryCatch_1.default)(user_control_1.default.patchPassword));
userRouter.get('/products', authenticate_user_1.default, (0, withTryCatch_1.default)(user_control_1.default.getProducts)); // 자신이 등록한 상품 목록 조회
userRouter.get('/articles', authenticate_user_1.default, (0, withTryCatch_1.default)(user_control_1.default.getArticles)); // 부가 기능
userRouter.get('/like/products', authenticate_user_1.default, (0, withTryCatch_1.default)(user_control_1.default.getLikedProducts)); // 자신이 등록한 상품 목록 조회
userRouter.get('/like/articles', authenticate_user_1.default, (0, withTryCatch_1.default)(user_control_1.default.getLikedArticles)); // 부가 기능
//userRouter.post('/myInfo/delete', deleteUser); // 부가 기능
exports.default = userRouter;
