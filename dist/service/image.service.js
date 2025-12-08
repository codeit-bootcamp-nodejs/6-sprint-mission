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
const constants_js_1 = require("../lib/constants.js");
const user_repo_js_1 = __importDefault(require("../repository/user.repo.js"));
const article_repo_js_1 = __importDefault(require("../repository/article.repo.js"));
const product_repo_js_1 = __importDefault(require("../repository/product.repo.js"));
const selectFields_js_1 = require("../lib/selectFields.js");
function get(originalUrl, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let item = {};
        if (originalUrl.includes('users')) {
            item = yield user_repo_js_1.default.findById(Number(id));
        }
        else if (originalUrl.includes('products')) {
            item = yield product_repo_js_1.default.findById(Number(id));
        }
        else {
            item = yield article_repo_js_1.default.findById(Number(id));
        }
        if (originalUrl.includes('users'))
            return (0, selectFields_js_1.selectUserFields)(item, 'core');
        else
            return (0, selectFields_js_1.selectArticleProductFields)(item);
    });
}
function post(originalUrl, id, protocol, file, host) {
    return __awaiter(this, void 0, void 0, function* () {
        // 업로드된 파일을 접근 가능한 URL생성해서 응답으로 반환
        let staticPath = '';
        let publicPath = '';
        let item = {};
        if (originalUrl.includes('products')) {
            staticPath = path_1.default.join(constants_js_1.STATIC_IMG_PATH, '/product'); // 이미지 저장 폴더 설정: 현재는 localhost
            publicPath = path_1.default.join(constants_js_1.PUBLIC_IMG_PATH, '/product');
            item = yield product_repo_js_1.default.findById(Number(id)); // DB에서 imageUrls 배열 가져옴
        }
        if (originalUrl.includes('articles')) {
            staticPath = path_1.default.join(constants_js_1.STATIC_IMG_PATH, '/article');
            publicPath = path_1.default.join(constants_js_1.PUBLIC_IMG_PATH, '/article');
            item = yield article_repo_js_1.default.findById(Number(id));
        }
        if (originalUrl.includes('users')) {
            staticPath = path_1.default.join(constants_js_1.STATIC_IMG_PATH, '/user');
            publicPath = path_1.default.join(constants_js_1.PUBLIC_IMG_PATH, '/user');
            item = yield user_repo_js_1.default.findById(Number(id));
        }
        // if (!fs.existsSync(staticPath)) {
        //   fs.mkdirSync(staticPath, { recursive: true }); //이미지 저장 폴더 없으면 생성
        //   console.log('이미지 소스 폴더 생성');
        // }
        //path.posix.join() : 여러개의 문자열 인자를 받아 하나의 경로 문자열로 만듬(운영체제에 관계없이 일관된 경로형식 유지)
        const newImageUrl = file
            ? `${protocol}://${host}${path_1.default.posix.join(publicPath, file.filename)}`
            : null;
        console.log(item.imageUrls);
        const updatedUrls = [...item.imageUrls, newImageUrl]; // 기존 imageUrls에 이번 것 끝에 넣어줌
        if (originalUrl.includes('products'))
            item = yield product_repo_js_1.default.patch(Number(id), { imageUrls: updatedUrls });
        if (originalUrl.includes('articles'))
            item = yield article_repo_js_1.default.patch(Number(id), { imageUrls: updatedUrls });
        if (originalUrl.includes('users'))
            item = yield user_repo_js_1.default.patch(Number(id), { imageUrls: updatedUrls });
        if (originalUrl.includes('users'))
            return (0, selectFields_js_1.selectUserFields)(item, 'core');
        else
            return (0, selectFields_js_1.selectArticleProductFields)(item);
    });
}
function erase(originalUrl, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let item = {};
        if (originalUrl.includes('products'))
            item = yield product_repo_js_1.default.patch(Number(id), { imageUrls: [] });
        if (originalUrl.includes('articles'))
            item = yield article_repo_js_1.default.patch(Number(id), { imageUrls: [] });
        if (originalUrl.includes('users'))
            item = yield user_repo_js_1.default.patch(Number(id), { imageUrls: [] });
        if (originalUrl.includes('users'))
            return (0, selectFields_js_1.selectUserFields)(item, 'core');
        else
            return (0, selectFields_js_1.selectArticleProductFields)(item);
    });
}
exports.default = {
    get,
    post,
    erase
};
