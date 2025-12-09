"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_control_1 = __importDefault(require("../controller/comment.control"));
const withTryCatch_1 = __importDefault(require("../lib/withTryCatch"));
const authenticate_user_1 = __importDefault(require("../middleware/authenticate.user"));
const authorize_user_1 = __importDefault(require("../middleware/authorize.user"));
const commentRouter = express_1.default.Router();
commentRouter.get('/', (0, withTryCatch_1.default)(comment_control_1.default.getList));
commentRouter.get('/:id', (0, withTryCatch_1.default)(comment_control_1.default.get));
commentRouter.post('/articles/:id', authenticate_user_1.default, (0, withTryCatch_1.default)(comment_control_1.default.postArticle));
commentRouter.post('/products/:id', authenticate_user_1.default, (0, withTryCatch_1.default)(comment_control_1.default.postProduct));
commentRouter.patch('/:id', authenticate_user_1.default, authorize_user_1.default, (0, withTryCatch_1.default)(comment_control_1.default.patch));
commentRouter.delete('/:id', authenticate_user_1.default, authorize_user_1.default, (0, withTryCatch_1.default)(comment_control_1.default.erase));
exports.default = commentRouter;
