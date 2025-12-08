"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_user_1 = __importDefault(require("../middleware/authenticate.user"));
const authorize_user_1 = __importDefault(require("../middleware/authorize.user"));
const product_control_1 = __importDefault(require("../controller/product.control"));
const withTryCatch_1 = __importDefault(require("../lib/withTryCatch"));
const productRouter = express_1.default.Router();
productRouter.get('/', (0, withTryCatch_1.default)(product_control_1.default.getList));
productRouter.get('/:id', authenticate_user_1.default, (0, withTryCatch_1.default)(product_control_1.default.get));
productRouter.post('/:id/like', authenticate_user_1.default, (0, withTryCatch_1.default)(product_control_1.default.like));
productRouter.post('/:id/like/cancel', authenticate_user_1.default, (0, withTryCatch_1.default)(product_control_1.default.cancelLike));
productRouter.post('/', authenticate_user_1.default, (0, withTryCatch_1.default)(product_control_1.default.post));
productRouter.patch('/:id', authenticate_user_1.default, authorize_user_1.default, (0, withTryCatch_1.default)(product_control_1.default.patch));
productRouter.delete('/:id', authenticate_user_1.default, authorize_user_1.default, (0, withTryCatch_1.default)(product_control_1.default.erase));
exports.default = productRouter;
