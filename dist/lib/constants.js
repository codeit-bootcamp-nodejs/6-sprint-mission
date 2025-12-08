"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATIC_IMG_PATH = exports.PUBLIC_IMG_PATH = exports.REFRESH_TOKEN_MAXAGE = exports.REFRESH_TOKEN_EXPIRESIN = exports.ACCESS_TOKEN_MAXAGE = exports.ACCESS_TOKEN_EXPIRESIN = exports.REFRESH_TOKEN_COOKIE_NAME = exports.ACCESS_TOKEN_COOKIE_NAME = exports.JWT_REFRESH_TOKEN_SECRET = exports.JWT_ACCESS_TOKEN_SECRET = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
exports.NODE_ENV = NODE_ENV;
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'your_jwt_access_token_secret';
exports.JWT_ACCESS_TOKEN_SECRET = JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'your_jwt_refresh_token_secret';
exports.JWT_REFRESH_TOKEN_SECRET = JWT_REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_COOKIE_NAME = 'access-token';
exports.ACCESS_TOKEN_COOKIE_NAME = ACCESS_TOKEN_COOKIE_NAME;
const REFRESH_TOKEN_COOKIE_NAME = 'refresh-token';
exports.REFRESH_TOKEN_COOKIE_NAME = REFRESH_TOKEN_COOKIE_NAME;
const ACCESS_TOKEN_EXPIRESIN = '1h';
exports.ACCESS_TOKEN_EXPIRESIN = ACCESS_TOKEN_EXPIRESIN;
const REFRESH_TOKEN_EXPIRESIN = '1d';
exports.REFRESH_TOKEN_EXPIRESIN = REFRESH_TOKEN_EXPIRESIN;
const ACCESS_TOKEN_MAXAGE = 1 * 60 * 60 * 1000; // 1 hour
exports.ACCESS_TOKEN_MAXAGE = ACCESS_TOKEN_MAXAGE;
const REFRESH_TOKEN_MAXAGE = 1 * 24 * 60 * 60 * 1000; // 1 day
exports.REFRESH_TOKEN_MAXAGE = REFRESH_TOKEN_MAXAGE;
// image paths
const STATIC_IMG_PATH = path_1.default.resolve(process.cwd(), 'images_upload'); //pc경로 루트디렉토리의 images
exports.STATIC_IMG_PATH = STATIC_IMG_PATH;
const PUBLIC_IMG_PATH = '/public/images'; //url경로
exports.PUBLIC_IMG_PATH = PUBLIC_IMG_PATH;
