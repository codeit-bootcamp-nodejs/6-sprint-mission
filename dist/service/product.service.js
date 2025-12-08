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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superstruct_1 = require("superstruct");
const myFuns_js_1 = require("../lib/myFuns.js");
const product_repo_js_1 = __importDefault(require("../repository/product.repo.js"));
const structs_js_1 = require("../struct/structs.js");
const selectFields_js_1 = require("../lib/selectFields.js");
function post(userId, Data) {
    return __awaiter(this, void 0, void 0, function* () {
        const productData = Object.assign(Object.assign({}, Data), { userId: Number(userId) });
        (0, superstruct_1.assert)(productData, structs_js_1.CreateProduct);
        const product = yield product_repo_js_1.default.post(productData);
        if ((0, myFuns_js_1.isEmpty)(product))
            throw new Error('NOT_FOUND');
        return product;
    });
}
function patch(productId, productData) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(productData, structs_js_1.PatchProduct);
        const product = yield product_repo_js_1.default.patch(Number(productId), productData);
        if ((0, myFuns_js_1.isEmpty)(product))
            throw new Error('NOT_FOUND');
        return product;
    });
}
function erase(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield product_repo_js_1.default.erase(Number(productId));
    });
}
// 상품 목록 조회
// 조회 필드: id, name, price, createdAt
// 페이지네이션: offset 방식 (default: offset=0, limit=10)
// 조회순: order='recent'(default)/'oldest'
// 조건 검색: namd and/or description에 포함된 단어
function getList(offset, limit, orderStr, nameStr, descriptionStr) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderBy = {};
        if (orderStr === 'oldest') {
            orderBy.createdAt = 'asc';
        }
        else
            orderBy.createdAt = 'desc';
        const where = {};
        if (nameStr)
            where.name = { contains: nameStr };
        if (descriptionStr)
            where.description = { contains: descriptionStr };
        const products = yield product_repo_js_1.default.getList(where, orderBy, offset, limit);
        const productsToShow = products.map((p) => {
            const { id, name, price, createdAt } = p, rest = __rest(p, ["id", "name", "price", "createdAt"]);
            return { id, name, price, createdAt };
        });
        return productsToShow;
    });
}
// 상품 상세 조회
// 조회 필드: id, name, description, price, tags, createdAt
function get(user, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        let product = yield product_repo_js_1.default.findById(Number(productId));
        product = (0, selectFields_js_1.selectArticleProductFields)(product);
        if (!(0, myFuns_js_1.isEmpty)(user)) {
            if (product.likedUsers.includes(user.nickname))
                return Object.assign({ isLiked: true }, product);
            else
                return Object.assign({ isLiked: false }, product);
        }
        else
            return product;
    });
}
function like(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        let product = yield product_repo_js_1.default.findById(Number(productId));
        if (product.likedUsers.find((n) => n.id === userId)) {
            console.log('Already your favorite product');
        }
        else {
            console.log('Now, one of your favorite products');
            product = yield product_repo_js_1.default.patch(Number(productId), {
                likedUsers: { connect: { id: Number(userId) } }
            });
        }
        product = (0, selectFields_js_1.selectArticleProductFields)(product);
        return Object.assign({ isLiked: true }, product);
    });
}
function cancelLike(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        let product = yield product_repo_js_1.default.findById(Number(productId));
        if (!product.likedUsers.find((n) => n.id === Number(userId))) {
            console.log('Already not one of your liked products');
        }
        else {
            console.log('Now, not one of your liked products');
            product = yield product_repo_js_1.default.patch(Number(productId), {
                likedUsers: { disconnect: { id: Number(userId) } }
            });
        }
        product = (0, selectFields_js_1.selectArticleProductFields)(product);
        return Object.assign({ isLiked: false }, product);
    });
}
exports.default = {
    post,
    patch,
    erase,
    getList,
    get,
    like,
    cancelLike
};
