"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const authorize_1 = __importDefault(require("../middleware/authorize"));
const image_control_1 = __importDefault(require("../controller/image.control"));
const withTryCatch_1 = __importDefault(require("../lib/withTryCatch"));
const multer_1 = __importDefault(require("../middleware/multer"));
const imageRouter = express_1.default.Router();
imageRouter.get('/:type/:id', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(image_control_1.default.getList));
imageRouter.get('/:type/:id/:filename', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(image_control_1.default.get));
imageRouter.post('/:type/:id', (0, authenticate_1.default)(), authorize_1.default, multer_1.default.single('image'), (0, withTryCatch_1.default)(image_control_1.default.post));
imageRouter.delete('/:type/:id', (0, authenticate_1.default)(), authorize_1.default, (0, withTryCatch_1.default)(image_control_1.default.delList));
imageRouter.delete('/:type/:id/:filename', (0, authenticate_1.default)(), authorize_1.default, (0, withTryCatch_1.default)(image_control_1.default.del));
exports.default = imageRouter;
