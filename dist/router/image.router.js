"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_user_1 = __importDefault(require("../middleware/authenticate.user"));
const authorize_user_1 = __importDefault(require("../middleware/authorize.user"));
const image_control_1 = __importDefault(require("../controller/image.control"));
const withTryCatch_1 = __importDefault(require("../lib/withTryCatch"));
const multer_1 = __importDefault(require("../middleware/multer"));
const imageRouter = express_1.default.Router();
// 사용자
imageRouter.get('/users/:id', (0, withTryCatch_1.default)(image_control_1.default.get));
imageRouter.post('/users/:id', authenticate_user_1.default, authorize_user_1.default, multer_1.default.single('image'), (0, withTryCatch_1.default)(image_control_1.default.post));
imageRouter.delete('/users/:id', authenticate_user_1.default, authorize_user_1.default, (0, withTryCatch_1.default)(image_control_1.default.erase));
// 상품
imageRouter.get('/products/:id', (0, withTryCatch_1.default)(image_control_1.default.get));
imageRouter.post('/products/:id', authenticate_user_1.default, authorize_user_1.default, multer_1.default.single('image'), (0, withTryCatch_1.default)(image_control_1.default.post));
imageRouter.delete('/products/:id', authenticate_user_1.default, authorize_user_1.default, (0, withTryCatch_1.default)(image_control_1.default.erase));
// 게시글
imageRouter.get('/articles/:id', (0, withTryCatch_1.default)(image_control_1.default.get));
imageRouter.post('/articles/:id', authenticate_user_1.default, authorize_user_1.default, multer_1.default.single('image'), (0, withTryCatch_1.default)(image_control_1.default.post));
imageRouter.delete('/articles/:id', authenticate_user_1.default, authorize_user_1.default, (0, withTryCatch_1.default)(image_control_1.default.erase));
exports.default = imageRouter;
// imageUrls String[]? 로 스키마에 정의되어 있어
// 전체 삭제는 가능하지만, 개별 삭제가 어려움
// 다음 버전에서는 스키마에 image 모델 만드는 게 나을 듯함
