"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_control_1 = __importDefault(require("../controller/auth.control"));
const withTryCatch_1 = __importDefault(require("../lib/withTryCatch"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const express_1 = __importDefault(require("express"));
const constants_1 = require("../lib/constants");
const validateReqBody_1 = require("../middleware/validateReqBody");
const authRouter = express_1.default.Router();
authRouter.post('/register', (0, validateReqBody_1.validateReqBody)(constants_1.allowedUserKeys, true), (0, withTryCatch_1.default)(auth_control_1.default.register));
authRouter.post('/login', (0, validateReqBody_1.validateReqBody)(constants_1.allowedUserKeys), (0, withTryCatch_1.default)(auth_control_1.default.login));
authRouter.post('/logout', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(auth_control_1.default.logout));
// 토큰 재발행
authRouter.get('/tokens/view', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(auth_control_1.default.viewTokens)); // 토큰 확인: 부가 기능
authRouter.post('/tokens/refresh', (0, withTryCatch_1.default)(auth_control_1.default.issueTokens));
exports.default = authRouter;
