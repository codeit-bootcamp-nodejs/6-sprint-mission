"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchComment = exports.CreateComment = exports.PatchArticle = exports.CreateArticle = exports.PatchProduct = exports.CreateProduct = exports.PatchUser = exports.CreateUser = void 0;
const s = __importStar(require("superstruct"));
exports.CreateUser = s.object({
    email: s.string(),
    nickname: s.string(),
    image: s.optional(s.string()),
    password: s.string() // hashed
});
exports.PatchUser = s.partial(exports.CreateUser);
exports.CreateProduct = s.object({
    name: s.string(),
    description: s.string(),
    price: s.min(s.number(), 0),
    tags: s.array(s.string()),
    imageUrls: s.optional(s.array()),
    userId: s.number()
});
exports.PatchProduct = s.partial(exports.CreateProduct);
exports.CreateArticle = s.object({
    title: s.string(),
    content: s.string(),
    imageUrls: s.optional(s.array()),
    userId: s.number()
});
exports.PatchArticle = s.partial(exports.CreateArticle);
exports.CreateComment = s.object({
    content: s.string(),
    articleId: s.optional(s.number()),
    productId: s.optional(s.number()),
    userId: s.number()
});
exports.PatchComment = s.partial(exports.CreateComment);
