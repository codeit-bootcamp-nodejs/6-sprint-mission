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
const constants_1 = require("../lib/constants");
const user_service_1 = __importDefault(require("../service/user.service"));
const BadRequestError_1 = __importDefault(require("./errors/BadRequestError"));
function authenticateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = check_accessTokenExist(req.cookies);
            if (!accessToken) {
                // 인증 예외: 로그인 안 한 사용자도 상품/게시물 상세정보 얻을 수 있게 함
                if (req.method === 'GET' && typeof req.params.id === 'string')
                    return next();
                console.log('Unauthorized');
                throw new BadRequestError_1.default('UNAUTHORIZED');
            }
            const { userId } = (0, token_1.verifyAccessToken)(accessToken);
            if (!userId) {
                console.log('No user found under the authorized token');
                throw new BadRequestError_1.default('NO_USER_FOUND');
            }
            const user = yield user_service_1.default.verifyUserExist(userId);
            if (!user) {
                console.log('No user foundwith the given ID by accessToken');
                throw new BadRequestError_1.default('NO_USER_FOUND');
            }
            req.user = user;
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
function check_accessTokenExist(cookieData) {
    const accessToken = cookieData[constants_1.ACCESS_TOKEN_COOKIE_NAME];
    // if (!accessToken) {
    //   print('No accessToken found');
    //   throw new NotFoundError('NO_ACCESSTOKEN_FOUND');
    // }
    return accessToken;
}
exports.default = authenticateUser;
