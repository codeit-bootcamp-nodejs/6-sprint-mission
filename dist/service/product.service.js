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
const myFuns_1 = require("../lib/myFuns");
const product_repo_1 = __importDefault(require("../repository/product.repo"));
const selectFields_1 = require("../lib/selectFields");
const client_1 = require("@prisma/client");
const NotFoundError_1 = __importDefault(require("../middleware/errors/NotFoundError"));
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
const product_struct_1 = require("../struct/product.struct");
const socketIO_1 = require("../websocket/socketIO");
function post(data) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(data, product_struct_1.CreateProduct);
        const { userId } = data, rest = __rest(data, ["userId"]);
        const productData = Object.assign(Object.assign({}, rest), { user: { connect: { id: userId } } });
        const { product, newPriceRecord } = yield prismaClient_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            const product = yield tx.product.create({ data: productData });
            const priceData = {
                price: data.price,
                product: { connect: { id: product.id } }
            };
            (0, superstruct_1.assert)({ productId: product.id, price: data.price }, product_struct_1.CreateProductPriceHistory);
            const newPriceRecord = yield tx.productPriceHistory.create({ data: priceData });
            return { product, newPriceRecord };
        }));
        return [product, newPriceRecord];
    });
}
function patch(productId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(data, product_struct_1.PatchProduct);
        const prevPrice = yield priceToBeChanged(productId, data);
        let newProduct;
        let priceRecord;
        // 상품 가격 변동이 있는 경우, 가격 변동 기록 생성
        if (Number(prevPrice)) {
            const priceData = {
                prevPrice,
                price: data.price,
                productId
            };
            (0, superstruct_1.assert)(priceData, product_struct_1.CreateProductPriceHistory);
            const priceDataToRepo = {
                prevPrice,
                price: data.price,
                product: { connect: { id: productId } }
            };
            const product = yield product_repo_1.default.findById(productId);
            if (!product)
                throw new NotFoundError_1.default();
            [priceRecord, newProduct] = yield prismaClient_1.default.$transaction([
                prismaClient_1.default.productPriceHistory.create({ data: priceDataToRepo }),
                prismaClient_1.default.product.update({ data, where: { id: productId } })
            ]);
            // 그 상품에 좋아요를 누른 사람이 있는 경우 알림 생성
            if (product.likedUsers.length !== 0) {
                const message = `상품${productId} 가격 변동 알림: (${prevPrice} --> ${data.price})`;
                let notificationData = [];
                for (const likedUser of product.likedUsers) {
                    // if (likedUser.id === product.userId) continue; //테스트 위해 본인에게도 보냄
                    const tempData = {
                        userId: likedUser.id,
                        type: client_1.NotificationType.PRODUCT,
                        message,
                        productId
                    };
                    (0, superstruct_1.assert)(tempData, product_struct_1.CreateNotification);
                    notificationData.push(tempData);
                }
                const notifications = yield prismaClient_1.default.notification.createMany({ data: notificationData });
                const io = (0, socketIO_1.getIO)();
                for (const likedUser of product.likedUsers) {
                    // if (likedUser.id === product.userId) continue; // 테스트 위해 본인에게도 보내기
                    io.to(`user:${likedUser.id}`).emit('notification', { message });
                }
                console.log('');
                console.log('Price changed');
                console.log('ProductPriceHistory updated');
                console.log('Notification sent & stored');
            }
        }
        else {
            newProduct = yield product_repo_1.default.patch(productId, data);
        }
        if (!newProduct)
            throw new NotFoundError_1.default();
        return newProduct;
    });
}
function erase(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield product_repo_1.default.erase(Number(productId));
    });
}
// 상품 목록 조회
// 조회 필드: id, name, price, createdAt
// 페이지네이션: offset 방식 (default: offset=0, limit=10)
// 조회순: order='recent'(default)/'oldest'
// 조건 검색: namd and/or description에 포함된 단어
function getList(offset, limit, orderStr, nameStr, descriptionStr) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderBy = { createdAt: 'desc' };
        if (orderStr === 'oldest') {
            orderBy.createdAt = 'asc';
        }
        else
            orderBy.createdAt = 'desc';
        const where = { name: { contains: '' }, description: { contains: '' } };
        if (nameStr)
            where.name = { contains: nameStr };
        if (descriptionStr)
            where.description = { contains: descriptionStr };
        const products = yield product_repo_1.default.getList(where, orderBy, offset, limit);
        const productsToShow = products.map((p) => {
            const { id, name, price, createdAt } = p, rest = __rest(p, ["id", "name", "price", "createdAt"]);
            return { id, name, price, createdAt };
        });
        return productsToShow;
    });
}
// 상품 상세 조회
// 조회 필드: id, name, description, price, tags, createdAt
function get(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_repo_1.default.findById(productId);
        const product2show = (0, selectFields_1.selectFields)(product);
        if (!userId)
            return product2show;
        const isLiked = (0, myFuns_1.includedOk)(product.likedUsers, 'id', userId);
        return Object.assign({ isLiked }, product2show);
    });
}
// 좋아요와 좋아요취소 토글
function likeToggle(userId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_repo_1.default.findById(productId);
        const isLiked = (0, myFuns_1.includedOk)(product.likedUsers, 'id', userId);
        const updated = isLiked
            ? yield product_repo_1.default.cancelLike(productId, userId)
            : yield product_repo_1.default.like(productId, userId);
        console.log(isLiked ? 'Now, not your favorite product' : 'Now, your favorite product');
        const product2show = (0, selectFields_1.selectFields)(updated);
        return Object.assign({ isLiked: !isLiked }, product2show);
    });
}
function getPriceRecord(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield product_repo_1.default.getPriceRecord(id);
    });
}
function getPriceRecords(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield product_repo_1.default.getPriceRecords(productId);
    });
}
//-----------------------------------
function priceToBeChanged(productId, productData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (productData.price === undefined)
            return 0;
        const currentProduct = yield product_repo_1.default.findById(productId);
        if (!currentProduct)
            throw new NotFoundError_1.default();
        if (productData.price === currentProduct.price)
            return 0;
        return currentProduct.price;
    });
}
exports.default = {
    post,
    patch,
    erase,
    getList,
    get,
    likeToggle,
    getPriceRecord,
    getPriceRecords
};
