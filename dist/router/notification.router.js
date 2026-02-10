"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_control_1 = __importDefault(require("../controller/notification.control"));
const withTryCatch_1 = __importDefault(require("../lib/withTryCatch"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const notiRouter = express_1.default.Router();
notiRouter.get('/', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(notification_control_1.default.getList)); // 알림 목록 조회
notiRouter.get('/:id', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(notification_control_1.default.countUnread)); // 알림 조회
notiRouter.patch('/:id', (0, authenticate_1.default)(), (0, withTryCatch_1.default)(notification_control_1.default.patch)); // 알림 수정 (단방향: 읽음으로)
exports.default = notiRouter;
// userRouter로 합칠 예정
