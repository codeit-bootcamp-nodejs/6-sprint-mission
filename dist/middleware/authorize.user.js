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
const BadRequestError_1 = __importDefault(require("./errors/BadRequestError"));
const user_repo_1 = __importDefault(require("../repository/user.repo"));
const article_repo_1 = __importDefault(require("../repository/article.repo"));
const product_repo_1 = __importDefault(require("../repository/product.repo"));
const comment_repo_1 = __importDefault(require("../repository/comment.repo"));
function authorizeUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let item;
            if (req.originalUrl.includes('users')) {
                const userItem = (yield user_repo_1.default.findById(Number(req.params.id)));
                item = Object.assign(Object.assign({}, userItem), { userId: userItem.id });
            }
            else if (req.originalUrl.includes('products')) {
                item = (yield product_repo_1.default.findById(Number(req.params.id)));
            }
            else if (req.originalUrl.includes('articles')) {
                item = (yield article_repo_1.default.findById(Number(req.params.id)));
            }
            else if (req.originalUrl.includes('comments')) {
                item = (yield comment_repo_1.default.findById(Number(req.params.id)));
            }
            else {
                console.log('');
                console.log('Something went wrong');
                throw new BadRequestError_1.default('BADREQUEST');
            }
            // console.log('');
            // console.log(`Testing authorizeUser.js...`);
            // console.log(`ueq.user.id: ${req.user.id}`);
            // console.log(`item.userId: ${item.userId}`);
            // console.log('');
            if (req.user.id !== item.userId) {
                console.log('');
                console.log('Unauthorized');
                throw new BadRequestError_1.default('UNAUTHORIZED');
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = authorizeUser;
