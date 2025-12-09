"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const article_control_1 = __importDefault(require("../controller/article.control"));
const authenticate_user_1 = __importDefault(require("../middleware/authenticate.user"));
const authorize_user_1 = __importDefault(require("../middleware/authorize.user"));
const withTryCatch_1 = __importDefault(require("../lib/withTryCatch"));
const articleRouter = express_1.default.Router();
articleRouter.get('/', (0, withTryCatch_1.default)(article_control_1.default.getList));
articleRouter.get('/:id', authenticate_user_1.default, (0, withTryCatch_1.default)(article_control_1.default.get));
articleRouter.post('/:id/like', authenticate_user_1.default, (0, withTryCatch_1.default)(article_control_1.default.like));
articleRouter.post('/:id/like/cancel', authenticate_user_1.default, (0, withTryCatch_1.default)(article_control_1.default.cancelLike));
articleRouter.post('/', authenticate_user_1.default, (0, withTryCatch_1.default)(article_control_1.default.post));
articleRouter.patch('/:id', authenticate_user_1.default, authorize_user_1.default, (0, withTryCatch_1.default)(article_control_1.default.patch));
articleRouter.delete('/:id', authenticate_user_1.default, authorize_user_1.default, (0, withTryCatch_1.default)(article_control_1.default.erase));
exports.default = articleRouter;
