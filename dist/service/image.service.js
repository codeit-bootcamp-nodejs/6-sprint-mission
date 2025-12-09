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
const path_1 = __importDefault(require("path"));
const constants_1 = require("../lib/constants");
const user_repo_1 = __importDefault(require("../repository/user.repo"));
const article_repo_1 = __importDefault(require("../repository/article.repo"));
const product_repo_1 = __importDefault(require("../repository/product.repo"));
const selectFields_1 = require("../lib/selectFields");
function get(originalUrl, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let item = {};
        if (originalUrl.includes('users')) {
            item = yield user_repo_1.default.findById(Number(id));
            return (0, selectFields_1.selectUserFields)(item, 'core');
        }
        else if (originalUrl.includes('products')) {
            item = yield product_repo_1.default.findById(Number(id));
            return (0, selectFields_1.selectProductFields)(item);
        }
        else {
            item = yield article_repo_1.default.findById(Number(id));
            return (0, selectFields_1.selectArticleFields)(item);
        }
    });
}
function post(originalUrl, id, protocol, file, host) {
    return __awaiter(this, void 0, void 0, function* () {
        // 업로드된 파일을 접근 가능한 URL생성해서 응답으로 반환
        let staticPath = '';
        let publicPath = '';
        let item = {};
        if (originalUrl.includes('products')) {
            staticPath = path_1.default.join(constants_1.STATIC_IMG_PATH, '/product'); // 이미지 저장 폴더 설정: 현재는 localhost
            publicPath = path_1.default.join(constants_1.PUBLIC_IMG_PATH, '/product'); // 위 폴더를 가리키는 public용 라우터 폴더
            item = (yield product_repo_1.default.findById(Number(id)));
        }
        if (originalUrl.includes('articles')) {
            staticPath = path_1.default.join(constants_1.STATIC_IMG_PATH, '/article');
            publicPath = path_1.default.join(constants_1.PUBLIC_IMG_PATH, '/article');
            item = (yield article_repo_1.default.findById(Number(id)));
        }
        if (originalUrl.includes('users')) {
            staticPath = path_1.default.join(constants_1.STATIC_IMG_PATH, '/user');
            publicPath = path_1.default.join(constants_1.PUBLIC_IMG_PATH, '/user');
            item = (yield user_repo_1.default.findById(Number(id)));
        }
        const newImageUrl = file
            ? `${protocol}://${host}${path_1.default.posix.join(publicPath, file.filename)}`
            : null;
        let updatedUrls = [];
        if ('imageUrls' in item) {
            updatedUrls = [...item.imageUrls, newImageUrl]; // 기존 imageUrls에 이번 것 끝에 넣어줌
        }
        else {
            updatedUrls = [newImageUrl];
        }
        const imageData = { imageUrls: updatedUrls };
        if (originalUrl.includes('products')) {
            item = yield product_repo_1.default.patch(Number(id), imageData);
            return (0, selectFields_1.selectProductFields)(item);
        }
        if (originalUrl.includes('articles')) {
            item = yield article_repo_1.default.patch(Number(id), imageData);
            return (0, selectFields_1.selectArticleFields)(item);
        }
        if (originalUrl.includes('users')) {
            item = yield user_repo_1.default.patch(Number(id), imageData);
            return (0, selectFields_1.selectUserFields)(item, 'core');
        }
    });
}
function erase(originalUrl, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let item = {};
        if (originalUrl.includes('products')) {
            item = yield product_repo_1.default.patch(Number(id), { imageUrls: [] });
            return (0, selectFields_1.selectProductFields)(item);
        }
        if (originalUrl.includes('articles')) {
            item = yield article_repo_1.default.patch(Number(id), { imageUrls: [] });
            return (0, selectFields_1.selectArticleFields)(item);
        }
        if (originalUrl.includes('users')) {
            item = yield user_repo_1.default.patch(Number(id), { imageUrls: [] });
            return (0, selectFields_1.selectUserFields)(item, 'core');
        }
    });
}
exports.default = {
    get,
    post,
    erase
};
