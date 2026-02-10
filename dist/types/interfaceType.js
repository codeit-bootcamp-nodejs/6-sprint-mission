"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoMap = void 0;
// 이미지 관련
const user_repo_1 = __importDefault(require("../repository/user.repo"));
const article_repo_1 = __importDefault(require("../repository/article.repo"));
const product_repo_1 = __importDefault(require("../repository/product.repo"));
exports.RepoMap = {
    products: product_repo_1.default,
    articles: article_repo_1.default,
    users: user_repo_1.default
};
