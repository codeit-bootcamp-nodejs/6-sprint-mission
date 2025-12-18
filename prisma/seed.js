"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
//import { CompleteArticle, CompleteProduct, CompleteUser } from '../src/dto/interfaceType';
var mock_1 = require("./mock");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var userData, _i, USERS_1, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Deleting old data...');
                    return [4 /*yield*/, prisma.comment.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.product.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.article.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 4:
                    _a.sent();
                    console.log('Seeding started...');
                    userData = mock_1.USERS.map(function (user) {
                        var id = user.id, email = user.email, nickname = user.nickname, password = user.password, createdAt = user.createdAt, updatedAt = user.updatedAt, rest = __rest(user, ["id", "email", "nickname", "password", "createdAt", "updatedAt"]);
                        return { id: id, email: email, nickname: nickname, password: password, createdAt: createdAt, updatedAt: updatedAt };
                    });
                    // const productData = PRODUCTS.map((product) => {
                    //   const { comments, ...rest } = product;
                    //   return rest;
                    // });
                    // const articleData = ARTICLES.map((article) => {
                    //   const { comments, ...rest } = article;
                    //   return rest;
                    // });
                    return [4 /*yield*/, prisma.user.createMany({ data: userData, skipDuplicates: true })];
                case 5:
                    // const productData = PRODUCTS.map((product) => {
                    //   const { comments, ...rest } = product;
                    //   return rest;
                    // });
                    // const articleData = ARTICLES.map((article) => {
                    //   const { comments, ...rest } = article;
                    //   return rest;
                    // });
                    _a.sent();
                    return [4 /*yield*/, prisma.product.createMany({ data: mock_1.PRODUCTS, skipDuplicates: true })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.article.createMany({ data: mock_1.ARTICLES, skipDuplicates: true })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, prisma.comment.createMany({ data: mock_1.COMMENTS, skipDuplicates: true })];
                case 8:
                    _a.sent();
                    _i = 0, USERS_1 = mock_1.USERS;
                    _a.label = 9;
                case 9:
                    if (!(_i < USERS_1.length)) return [3 /*break*/, 14];
                    user = USERS_1[_i];
                    if (!(user.likedProducts && user.likedProducts.length > 0)) return [3 /*break*/, 11];
                    return [4 /*yield*/, prisma.user.update({
                            where: { id: user.id },
                            data: {
                                likedProducts: {
                                    connect: user.likedProducts.map(function (pid) { return ({ id: pid }); })
                                }
                            }
                        })];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11:
                    if (!(user.likedArticles && user.likedArticles.length > 0)) return [3 /*break*/, 13];
                    return [4 /*yield*/, prisma.user.update({
                            where: { id: user.id },
                            data: {
                                likedArticles: {
                                    connect: user.likedArticles.map(function (aid) { return ({ id: aid }); })
                                }
                            }
                        })];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    _i++;
                    return [3 /*break*/, 9];
                case 14: 
                // User
                return [4 /*yield*/, prisma.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  SELECT setval(\n    pg_get_serial_sequence('\"User\"', 'id'),\n    (SELECT MAX(id) FROM \"User\")\n  );\n"], ["\n  SELECT setval(\n    pg_get_serial_sequence('\"User\"', 'id'),\n    (SELECT MAX(id) FROM \"User\")\n  );\n"])))];
                case 15:
                    // User
                    _a.sent();
                    // Product
                    return [4 /*yield*/, prisma.$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  SELECT setval(\n    pg_get_serial_sequence('\"Product\"', 'id'),\n    (SELECT MAX(id) FROM \"Product\")\n  );\n"], ["\n  SELECT setval(\n    pg_get_serial_sequence('\"Product\"', 'id'),\n    (SELECT MAX(id) FROM \"Product\")\n  );\n"])))];
                case 16:
                    // Product
                    _a.sent();
                    // Article
                    return [4 /*yield*/, prisma.$executeRaw(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  SELECT setval(\n    pg_get_serial_sequence('\"Article\"', 'id'),\n    (SELECT MAX(id) FROM \"Article\")\n  );\n"], ["\n  SELECT setval(\n    pg_get_serial_sequence('\"Article\"', 'id'),\n    (SELECT MAX(id) FROM \"Article\")\n  );\n"])))];
                case 17:
                    // Article
                    _a.sent();
                    // Comment
                    return [4 /*yield*/, prisma.$executeRaw(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  SELECT setval(\n    pg_get_serial_sequence('\"Comment\"', 'id'),\n    (SELECT MAX(id) FROM \"Comment\")\n  );\n"], ["\n  SELECT setval(\n    pg_get_serial_sequence('\"Comment\"', 'id'),\n    (SELECT MAX(id) FROM \"Comment\")\n  );\n"])))];
                case 18:
                    // Comment
                    _a.sent();
                    console.log('Seeding finished.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
