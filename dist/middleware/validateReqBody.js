"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReqBody = validateReqBody;
const BadRequestError_1 = __importDefault(require("../middleware/errors/BadRequestError"));
function validateReqBody(allowedKeys, requireAll) {
    return (req, res, next) => {
        var _a;
        try {
            const bodyKeys = Object.keys((_a = req.body) !== null && _a !== void 0 ? _a : {});
            if (!bodyKeys.length)
                throw new BadRequestError_1.default('수정할 필드가 없습니다');
            const invalidKeys = bodyKeys.filter((k) => !allowedKeys.includes(k));
            if (invalidKeys.length) {
                throw new BadRequestError_1.default(`허용되지 않은 필드 (${invalidKeys.join(', ')})`);
            }
            if (requireAll) {
                const missingKeys = allowedKeys.filter((k) => !bodyKeys.includes(k));
                if (missingKeys.length) {
                    throw new BadRequestError_1.default(`필수 필드 누락 (${missingKeys.join(', ')})`);
                }
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
