"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const article_control_js_1 = __importDefault(require("../controller/article.control.js"));
const authenticate_user_js_1 = __importDefault(require("../middleware/authenticate.user.js"));
const authorize_user_js_1 = __importDefault(require("../middleware/authorize.user.js"));
const withTryCatch_js_1 = __importDefault(require("../lib/withTryCatch.js"));
const articleRouter = express_1.default.Router();
articleRouter.get('/', (0, withTryCatch_js_1.default)(article_control_js_1.default.getList));
articleRouter.get('/:id', authenticate_user_js_1.default, (0, withTryCatch_js_1.default)(article_control_js_1.default.get));
articleRouter.post('/:id/like', authenticate_user_js_1.default, (0, withTryCatch_js_1.default)(article_control_js_1.default.like));
articleRouter.post('/:id/like/cancel', authenticate_user_js_1.default, (0, withTryCatch_js_1.default)(article_control_js_1.default.cancelLike));
articleRouter.post('/', authenticate_user_js_1.default, (0, withTryCatch_js_1.default)(article_control_js_1.default.post));
articleRouter.patch('/:id', authenticate_user_js_1.default, authorize_user_js_1.default, (0, withTryCatch_js_1.default)(article_control_js_1.default.patch));
articleRouter.delete('/:id', authenticate_user_js_1.default, authorize_user_js_1.default, (0, withTryCatch_js_1.default)(article_control_js_1.default.erase));
exports.default = articleRouter;
