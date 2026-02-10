"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../lib/token");
const auth_service_1 = __importDefault(require("../service/auth.service"));
const UnauthorizedError_1 = __importDefault(require("./errors/UnauthorizedError"));
function authenticate(options) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const auth = req.headers.authorization;
            if (!auth) {
                if (options === null || options === void 0 ? void 0 : options.optional)
                    return next();
                throw new UnauthorizedError_1.default();
            }
            if (!auth.startsWith('Bearer '))
                throw new UnauthorizedError_1.default();
            const accessToken = auth.slice(7);
            const { userId } = (0, token_1.verifyAccessToken)(accessToken);
            const user = yield auth_service_1.default.verifyUserExist(userId);
            if (!user)
                throw new UnauthorizedError_1.default();
            req.user = user;
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = authenticate;
