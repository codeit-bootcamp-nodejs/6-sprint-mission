"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_ACCESS_KEY = exports.ACCESS_KEY_ID = exports.REGION = exports.BUCKETNAME = exports.allowedUserKeys = exports.allowedCommentKeys = exports.allowedArticleKeys = exports.allowedProductKeys = exports.REFRESH_TOKEN_MAXAGE = exports.ACCESS_TOKEN_MAXAGE = exports.REFRESH_TOKEN_EXPIRESIN = exports.ACCESS_TOKEN_EXPIRESIN = exports.REFRESH_TOKEN_COOKIE_NAME = exports.ACCESS_TOKEN_COOKIE_NAME = exports.JWT_REFRESH_TOKEN_SECRET = exports.JWT_ACCESS_TOKEN_SECRET = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.PORT = process.env.PORT || 3000;
exports.JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'your_jwt_access_token_secret';
exports.JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'your_jwt_refresh_token_secret';
exports.ACCESS_TOKEN_COOKIE_NAME = 'access-token';
exports.REFRESH_TOKEN_COOKIE_NAME = 'refresh-token';
exports.ACCESS_TOKEN_EXPIRESIN = '1h';
exports.REFRESH_TOKEN_EXPIRESIN = '1d';
exports.ACCESS_TOKEN_MAXAGE = 1 * 60 * 60 * 1000; // 1 hour
exports.REFRESH_TOKEN_MAXAGE = 1 * 24 * 60 * 60 * 1000; // 1 day
// image paths
//export const STATIC_IMG_PATH = path.resolve(process.cwd(), 'images_upload'); //pc경로 루트디렉토리의 images
//export const PUBLIC_IMG_PATH = '/public/images'; //url경로
// validate req.body
exports.allowedProductKeys = ['name', 'description', 'price', 'tags'];
exports.allowedArticleKeys = ['title', 'content'];
exports.allowedCommentKeys = ['content'];
exports.allowedUserKeys = ['email', 'nickname', 'password'];
exports.BUCKETNAME = required('AWS_BUCKET_NAME');
exports.REGION = required('AWS_REGION');
exports.ACCESS_KEY_ID = required('AWS_ACCESS_KEY_ID');
exports.SECRET_ACCESS_KEY = required('AWS_SECRET_ACCESS_KEY');
function required(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} is missing in .env`);
    }
    return value;
}
